"use client"
import { getAllCurrentWithHome } from "@/app/lib/home/currents";
import { createExchange, ExhangeFormUpload, getCurrentUser } from "@/app/lib/userlib/user";
import { addToast, Avatar, Button, Card, CardBody, CardFooter, CardHeader, Form, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Skeleton, Snippet, Spinner, Tooltip, useDisclosure } from "@heroui/react";
import { ArrowDown, BadgeCheck, CheckCircle, CircleX, MessageCircleQuestionMark, RotateCcw, Upload } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { Animation, Badge, Steps, Uploader } from "rsuite";
import Cookies from "js-cookie";
import { getExchangeList } from "@/app/lib/admin/exchangelists";
import { useRouter } from "next/navigation";


interface IstepOne {
  from_current_name: string,
  to_current_name: string,
  from_current_img: string,
  to_current_img: string,
  from_current_amount: number,
  to_current_amount: number,
  account_number: string,
  user_account_number: string,
  from_amount_code: string,
  to_amount_code: string,
  payment_proof?: string | null,
  userId: number
  number_from_payment?: string | null
  status?: IstatusEx

}
type IstatusEx = "waiting" | "complated" | "rejected" | "refund"


interface Icurrents {
  current_name: string
  key: string
  rate: number
  min: number
  max: number
  img: string
  reverse: number
  account_number: string
  code: string
  symbol: string
  category: string,
  active: boolean
  id?: string
}

export interface Iuser {
  id: number
  email: string
  avator: string
  firstname: string
  lastlogin: string
  lastname: string
  role: string
  username: string
}

export default function Homepagecom({ token, userInfo }: { token: string, userInfo: Iuser | null }) {
  const [fromCurSymbol, setFromCurSymbol] = useState<{ fromcur: string, tocur: string }>({
    fromcur: "",
    tocur: ""
  })
  const [errorCurrents, setErrorCurrents] = useState<{ errorFromCur: string | null, errorToCur: string | null, errorfromAmount?: string | null, errorAddressInput?: string | null }>({
    errorFromCur: null,
    errorToCur: null,
    errorfromAmount: null,
    errorAddressInput: null
  })
  const [cal_from_amount, setCalFromAmount] = useState<number>(0)
  const [step_one_data, setStepOneData] = useState<IstepOne | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [currentSteps, setCurrentSteps] = useState<number>(0)
  const [isPaymetProof, startPaymetProof] = useTransition()
  const [paymentScreenShot, setPaymentScreenshot] = useState<string | null>(null)
  const [isOpenToolTip, setIsOpenToolTip] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [allCurrents, setallCurrents] = useState<Icurrents[]>([])
  const [isPenExchange, startExchangeForm] = useTransition()
  const [exchangeId, setExchangeId] = useState<string | null>(null)
  const [isPendingGetExchange, startGetExchange] = useTransition()
 const [timeRefresh,setTime] = useState<string | null>(null)

  // get all currents
  useEffect(() => {

    startTransition(async () => {
      const result = await getAllCurrentWithHome()
      setallCurrents(result.currents)
    })

  }, [])



  // handle select current
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFromCurSymbol({
      ...fromCurSymbol,
      [name]: value
    }
    )
    setErrorCurrents({
      errorFromCur: null,
      errorToCur: null
    })

  }

  const fromCurfilImg = allCurrents?.find((e) => e.key == fromCurSymbol?.fromcur)
  const toCurfilImg = allCurrents?.find((e) => e.key == fromCurSymbol?.tocur)
  const toCurrSelectItems = allCurrents?.filter((item) => item.key !== fromCurfilImg?.key)
  const fromCurrSelectItems = allCurrents?.filter((fromC) => fromC.key !== toCurfilImg?.key)

  //  handleChange amount
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (value) {
      setErrorCurrents({
        errorFromCur: null,
        errorToCur: null,
        errorAddressInput: null,
        errorfromAmount: null
      })
    }
    if (name == "from_amount") {
      setCalFromAmount(Number(value))
    }

  }


  // calculate from amount to amount 
  const from_amount_rate = (cal_from_amount / 100) * Number(toCurfilImg?.rate);
  const get_amount = cal_from_amount - Number(from_amount_rate)
  const to_cur_rate = 1 - (1 / 100) * Number(toCurfilImg?.rate)
  // exchange rate
  const from_to_rate = `Current Rate ${fromCurfilImg?.code}1 ${fromCurfilImg?.current_name} is ${toCurfilImg?.code}${to_cur_rate} ${toCurfilImg?.current_name}`

  // handle form exchange input data
  const handleSubmitExchangeForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dataInput = Object.fromEntries(new FormData(e.currentTarget))
    // check if from amount is emty
    if (!dataInput.fromcur) {
      setErrorCurrents({
        errorFromCur: "Please select current you need to send",
        errorToCur: null
      })
      return
    }
    // check to amount if emty
    if (!dataInput.tocur) {
      setErrorCurrents({
        errorFromCur: null,
        errorToCur: "Please select the current you need to take"
      })
      return
    }

    // check from amount if emty
    if (!dataInput.from_amount) {
      setErrorCurrents({
        errorFromCur: null,
        errorToCur: null,
        errorfromAmount: "Please enter amount",
        errorAddressInput: null
      })
      return
    }
    // check if account input is emty
    if (!dataInput.to_current_addres) {
      setErrorCurrents({
        errorFromCur: null,
        errorToCur: null,
        errorfromAmount: null,
        errorAddressInput: `Please enter you ${toCurfilImg?.current_name} ${toCurfilImg?.category == "fiat" ? "Number" : "Address"}`

      })
      return
    }

    setErrorCurrents({
      errorFromCur: null,
      errorToCur: null,
      errorfromAmount: null,
      errorAddressInput: null
    })
    if (!token) {
      console.log("yes")
      onOpen()
      return
    }

    setCurrentSteps(1)
    setStepOneData({
      account_number: String(fromCurfilImg?.account_number) !== "undefined" ? String(fromCurfilImg?.account_number) : String(allCurrents.find((c) => c.key == "zaad")?.account_number),
      from_current_amount: Number(dataInput.from_amount),
      from_current_img: String(fromCurfilImg?.img),
      from_current_name: String(dataInput.fromcur),
      to_current_amount: Number(dataInput.to_amount),
      to_current_img: String(toCurfilImg?.img),
      to_current_name: String(dataInput.tocur),
      user_account_number: String(dataInput.to_current_addres),
      from_amount_code: String(fromCurfilImg?.code),
      to_amount_code: String(toCurfilImg?.code),
      userId: Number(userInfo?.id),

    })
    // check if user login

  }


  // payment proof screen shot upload
  const handleChangeFile = (file: File) => {

    startPaymetProof(async () => {
      const result = await ExhangeFormUpload(file)
      setPaymentScreenshot(result)
      setStepOneData({
        ...step_one_data,
        payment_proof: String(result) ? String(result) : null
      } as IstepOne)
    })
  }

  // set handle number from apyment number 
  const handleNumberFromPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setStepOneData({
      ...step_one_data,
      number_from_payment: String(val)
    } as IstepOne)

  }

  // handle paid button
  const handlePaidButton = () => {
    if (!step_one_data?.number_from_payment) {
      console.log("number from payment is required")
      addToast({
        title: "Number from payment is required",
        description: "Number ka ama address ka lacagta kaso dirtay gali mesha ku qorantahay number from payment",
        color: "danger",
        timeout: 8000,
        shouldShowTimeoutProgress: true
      })
      return
    }
    if (!paymentScreenShot) {
      addToast({
        title: "Please Upload Screenshot",
        description: <p>Click <strong>Upload Payment Proof Screenshot</strong> to upload Screenshot with money you have sent us</p>,
        color: "danger",
        timeout: 8000,
        shouldShowTimeoutProgress: true
      })
      return
    }

    startExchangeForm(async () => {
      const result = await createExchange(step_one_data)
      if (result?.error) {
        addToast({
          title: "Error check you Network",
          description: result.error,
          color: "danger",
          timeout: 8000,
          shouldShowTimeoutProgress: true
        })
        return
      }
      if (result?.response?.data?.success == false) {
        addToast({
          title: "Error Accured",
          description: result?.response?.data?.error,
          color: "danger",
          timeout: 8000,
          shouldShowTimeoutProgress: true
        })
        return
      }
      if (result?.message) {
        addToast({
          title: "Error Accured",
          description: result?.message,
          color: "danger",
          timeout: 8000,
          shouldShowTimeoutProgress: true
        })
        return
      }

      if (result.success) {
        setCurrentSteps(2)
        Cookies.set("exchangeId", result?.makeExchange?.id)
      
      }

    })
  }

const timeRef = ()=>{
  setInterval(()=>{
   const t = new Date().toLocaleTimeString()
   setTime(t)
  },1000)
  
}





  // get new current exchane
  useEffect(() => {
    const exchangeIdGet = Cookies.get("exchangeId") as string
    setExchangeId(exchangeIdGet)
    if (exchangeId) {
        timeRef()
      setCurrentSteps(2)
      startGetExchange(async () => {
        const result = await getCurrentUser(String(exchangeId))
        setStepOneData(result as IstepOne)
        console.log(result)
      })
    }
  }, [startGetExchange, exchangeId, userInfo,timeRefresh])

  // step 01
  const StepOneForm = () => (

    <Card className="w-full lg:w-4xl md:w-3xl p-5">
      <CardBody>
        <Form onSubmit={handleSubmitExchangeForm} className="grid grid-cols-2 gap-6   sm:gap-3 p-2">
          {/* from amount select */}
          <Skeleton isLoaded={!isPending} className="rounded-2xl">
            <Select
              className="w-full col-span-2 sm:col-span-1"
              classNames={{
                label: "font-bold text-2xl",
                description: "text-danger"
              }} defaultSelectedKeys={fromCurfilImg?.current_name && [String(fromCurfilImg?.current_name)]}
              color={errorCurrents.errorFromCur ? "danger" : "default"}
              description={errorCurrents.errorFromCur && errorCurrents.errorFromCur}
              size="lg" labelPlacement="outside"

              startContent={fromCurfilImg
                && <Image alt="from current image" className="w-12 h-10 rounded-full border-1 border-primary-500" src={fromCurfilImg && fromCurfilImg.img} />
              }

              name="fromcur" onChange={handleChangeSelect} label="Send" placeholder="Select from current">
              {
                fromCurrSelectItems?.map((c) => (
                  <SelectItem startContent={<Image alt="place holder from cur image" className="w-10 border-1 border-primary-500 h-10 rounded-full" src={c.img} />}
                    textValue={c.current_name} key={c.key} >
                    <div className="grid grid-cols-1">
                      <h1> {c.current_name}</h1>
                      <Badge style={{ width: "35px", }} color="violet" content={c.symbol} className="w-auto uppercase" />
                    </div>
                  </SelectItem>
                ))
              }
            </Select>
          </Skeleton>
          {/* to amount select */}
          <Skeleton isLoaded={!isPending} className="rounded-2xl">
            <Select
              className="col-span-2 sm:col-span-1"
              color={errorCurrents.errorToCur ? "danger" : "default"}
              description={errorCurrents.errorToCur && errorCurrents.errorToCur}
              defaultSelectedKeys={toCurfilImg?.current_name && [String(toCurfilImg?.current_name)]} size="lg" name="tocur" onChange={handleChangeSelect}
              classNames={{
                label: "font-bold text-2xl",
                description: "text-danger"
              }}
              labelPlacement="outside"
              startContent={toCurfilImg && <Image alt="to current iamge" className="w-12 h-10 rounded-full border-1 border-primary-500" src={toCurfilImg && toCurfilImg.img} />

              } label="Get"
              placeholder="Select to current">
              {
                toCurrSelectItems?.map((c) => (
                  <SelectItem startContent={<Image alt="to cur image place holder" className="w-10 h-10 border-1 border-primary-500 rounded-full" src={c.img} />} textValue={c.current_name} key={c.key}>
                    <div className="grid grid-cols-1">
                      <h1> {c.current_name}</h1>
                      <Badge style={{ width: "35px" }} color="violet" content={c.symbol} className="w-auto uppercase" />
                    </div>
                  </SelectItem>
                ))
              }
            </Select>
          </Skeleton>
          {/* from amount input */}
          <Skeleton isLoaded={!isPending} className="rounded-2xl">
            <Input
              className="col-span-2 sm:col-span-1"
              onChange={handleChangeAmount}
              color={errorCurrents.errorfromAmount ? "danger" : "default"}
              placeholder="0.00"
              description={errorCurrents.errorfromAmount ? errorCurrents.errorfromAmount : (fromCurfilImg?.current_name && toCurfilImg?.current_name) && from_to_rate}
              classNames={{
                description: errorCurrents.errorfromAmount ? "text-danger" : "text-default-500 font-semibold"
              }}
              type="number" name="from_amount" label="From Amount"
              startContent={fromCurfilImg && <span className="font-bold text-default-500">{fromCurfilImg.code}</span>}
              endContent={fromCurfilImg && <span className="font-bold text-default-500">{fromCurfilImg.symbol}</span>}
            />
          </Skeleton>

          {/* to amount input */}
          <Skeleton isLoaded={!isPending} className="rounded-2xl">
            <Input
              className="col-span-2 sm:col-span-1"
              value={String(get_amount) && String(get_amount)}
              placeholder="0.00"
              type="number" name="to_amount" label="To Amount"
              startContent={toCurfilImg && <span className="font-bold text-default-500">{toCurfilImg.code}</span>}
              endContent={toCurfilImg && <span className="font-bold text-default-500 ">{toCurfilImg.symbol}</span>}
              description={toCurfilImg?.current_name && <div className="flex items-center justify-between font-bold">
                <h1>min: <span>{toCurfilImg?.code}{toCurfilImg?.min}</span></h1>
                <h1>max: <span>{toCurfilImg?.code}{toCurfilImg?.max}</span></h1>
              </div>}
            />
          </Skeleton>
          {
            // {/* you number or address input */}
            toCurfilImg?.category && <Input onChange={handleChangeAmount} className="col-span-2" classNames={{
              description: "text-danger-500"
            }} name="to_current_addres"
              color={errorCurrents.errorAddressInput ? "danger" : "default"}
              description={errorCurrents.errorAddressInput && errorCurrents.errorAddressInput}
              label={`You ${toCurfilImg.current_name} ${toCurfilImg.category == "fiat" ? "Number" : "Address"}`} />


          }

          <Skeleton isLoaded={!isPending} className="rounded-full">
            <Button type="submit" color="primary" className="col-span-2">Start Exchange</Button>
          </Skeleton>
        </Form>
      </CardBody>
    </Card>

  )

  // step 02
  const StepTwoForm = () => (
    <Animation.Slide in={true} enteredClassName="custom-entered" placement="bottom" >
      <Card className="w-full lg:w-4xl md:w-3xl p-5">
        <CardHeader className="w-full">
          <div className="flex items-center justify-around gap-5 w-full">
            <article className="flex gap-2 items-center">
              <Avatar isBordered color="primary" src={step_one_data?.from_current_img} alt="from amount" />
              <div>
                <h1>{step_one_data?.from_current_name}</h1>
                <p>${step_one_data?.from_current_amount}</p>
              </div>
            </article>
            <TbArrowBigRightLinesFilled className="text-4xl text-default-500" />
            <article className="flex gap-2 items-center">
              <Avatar isBordered color="primary" src={step_one_data?.to_current_img} alt="to amount" />
              <div>
                <h1>{step_one_data?.to_current_name}</h1>
                <p>${step_one_data?.to_current_amount}</p>
              </div>
            </article>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-3">
          <article>
            <h1>Send Amount</h1>
            <Snippet className="font-bold" color="danger" size="md" variant="shadow" >{step_one_data?.from_current_amount}</Snippet>
          </article>
          <article>
            <h1 className="flex items-center">Send Money Company account <ArrowDown className="text-default-500" /></h1>
            <Snippet color="primary" variant="shadow"

              classNames={{ base: "w-100", symbol: "hidden" }}>
              {step_one_data?.account_number}</Snippet>
          </article>
          <div className="flex items-center gap-1 w-full">
            <Input onChange={handleNumberFromPayment} name="number_from_payment" placeholder="Number from Payment" />
            <Tooltip className="cursor-pointer" content={<div className="max-w-55">
              Number from payment is is means you account <strong>{step_one_data?.from_current_name}

              </strong> Number or address
              number from payment numberka lacagta kaso dirtay gali lola jeda
            </div>}>
              <MessageCircleQuestionMark className="cursor-pointer" />
            </Tooltip>
          </div>

          <Uploader action="" onChange={(files) => {
            const file = files[0]?.blobFile
            file && handleChangeFile(file)
          }} autoUpload={false} multiple={false} method="POST" >

            <div className="w-full h-[200px] flex justify-center items-center bg-primary-100 rounded">
              {
                isPaymetProof ? <div className="flex items-center gap-2"><Spinner size="lg" color="warning" variant="wave" /> <h1 className="font-semibold">Uploading...</h1></div> :
                  paymentScreenShot ? <Image className="w-30 h-30 rounded" src={paymentScreenShot} alt="payment screenshot" /> : <h1 className="flex items-center gap-2 text-lg"><Upload /> Upload Payment proof Screenshot</h1>
              }

            </div>
          </Uploader>
          <article className="flex items-center gap-2">

            <h1>hada fahmin halkan ku dhufo</h1>
            <Tooltip isOpen={isOpenToolTip} onOpenChange={(open) => setIsOpenToolTip(false)} content={
              <p className="max-w-[400px]">Lacatagt ku dir numberka Companyiga ad u jedo copy dheh kadib ku dir
                marka dirto sawir kaso qad mesha upload ku qoran tahay tawo kadib sawirka so gali
                kadib ku dhufo buttonka hoos oo ah <strong>I PIAD </strong>
                ado lacagta dirin ha tawan i paid
              </p>}>
              <Button color="success" variant="faded" onPress={() => setIsOpenToolTip(!isOpenToolTip)}>
                Read More
              </Button>

            </Tooltip>

          </article>
        </CardBody>
        <CardFooter>
          <Button isLoading={isPenExchange} type="submit" onPress={handlePaidButton} color="primary">I PAID</Button>
        </CardFooter>
      </Card>
    </Animation.Slide>
  )

  // finaly step
  const StepThreeForm = () => (
    <Animation.Slide in={true} placement="bottom">
      <Card className="w-full lg:w-4xl md:w-3xl p-5" aria-label="final step">
        <CardBody className="flex gap-3 justify-around flex-row">
          {/* current info */}
          <div className="flex flex-col items-start gap-3 justify-center">
            {/* from */}
            <div className="flex gap-2">
              <Skeleton isLoaded={!isPenExchange || !isPendingGetExchange} className="rounded-full">
                <Avatar isBordered src={step_one_data?.from_current_img} />
              </Skeleton>
              <article>
                <Skeleton isLoaded={!isPenExchange || !isPendingGetExchange} className="rounded-2xl">
                  <h1 className="text-[18px] font-semibold">{step_one_data?.from_current_name}</h1>
                </Skeleton>
                <Skeleton isLoaded={!isPenExchange || !isPendingGetExchange} className="rounded-2xl mt-1">
                  <p className="font-semibold">{step_one_data?.from_amount_code}{step_one_data?.from_current_amount}</p>
                </Skeleton>
              </article>
            </div>
            {/* to */}
            <Skeleton isLoaded={!isPenExchange || !isPendingGetExchange} className="rounded-2xl">
              <ArrowDown className="text-primary-500 ml-2 font-bold text-2xl" />
            </Skeleton>
            <div className="flex gap-2">
              <Skeleton isLoaded={!isPenExchange || !isPendingGetExchange} className="rounded-full">
                <Avatar isBordered src={step_one_data?.to_current_img} />
              </Skeleton>
              <article>
                <Skeleton isLoaded={!isPenExchange || !isPendingGetExchange} className="rounded-2xl">
                  <h1 className="text-[18px] font-semibold">{step_one_data?.to_current_name}</h1>
                </Skeleton>
                <Skeleton isLoaded={!isPenExchange || !isPendingGetExchange} className="rounded-2xl mt-1">
                  <p className="font-semibold">{step_one_data?.to_amount_code}{step_one_data?.to_current_amount}</p>
                </Skeleton>
              </article>
            </div>
          </div>
          {/* staus */}
          <div className="space-y-3">
            <Skeleton isLoaded={!isPenExchange || !isPendingGetExchange} className="rounded-2xl">
              {
                step_one_data?.status == "waiting" && <h1 className="flex items-center gap-1 text-[18px] font-semibold text-warning-500"> <Spinner color="warning" variant="simple" /> {step_one_data?.status}</h1>
              }
              {
                step_one_data?.status == "complated" && <h1 className="flex items-center gap-1 text-[18px] font-semibold w-30 p-1 rounded justify-center bg-success-100 text-success-500"> <BadgeCheck /> {step_one_data?.status}</h1>
              }
              {
                step_one_data?.status == "refund" && <h1 className="flex items-center gap-1 text-[18px] font-semibold w-30 p-1 rounded justify-center bg-warning-100 text-warning-500 capitalize"> <RotateCcw /> {step_one_data?.status}</h1>
              }
              {
                step_one_data?.status == "rejected" && <h1 className="flex items-center gap-1 text-[18px] font-semibold w-30 p-1 rounded justify-center bg-danger-100 text-danger-500 capitalize"> <CircleX /> {step_one_data?.status}</h1>
              }
            </Skeleton>
            <Skeleton isLoaded={!isPenExchange || !isPendingGetExchange} className="rounded-2xl">
             {
              step_one_data?.status == "complated" &&  <p className="text-default-400 max-w-[400px]">Conguration you exchnage was Successfully Complated thank you with patient we are happy to join us if you not recieve you can contact our supports
              </p>
             }
             {
              step_one_data?.status == "waiting" &&  <p className="text-default-400 max-w-[400px]">Please waiting we are checking if the money you sent us or not fadlan sug waxan hubin dona hadi lacagta so dirtay ama soo dirin hubint ayaan ku jirna
              </p>
             }
             {
              step_one_data?.status == "refund" &&  <p className="text-default-400 max-w-[400px]">You money has been refunded please check you wallet lacagtataada wa la celiyay meesha kaso dirtay lagu celiyay
              </p>
             }
             {
              step_one_data?.status == "rejected" &&  <p className="text-default-400 max-w-[400px]">this order has been rejected my be the money you not sent or already we sent you dalabkadi wa la diiday fadlan hubi lacagta si sax ah in uso dirtay
              </p>
             }
            </Skeleton>
            {
               step_one_data?.status == "waiting" && <article>
                <h1 className="flex">  <ArrowDown/>The Money we wil send you account below</h1>
                <Snippet classNames={{symbol:"hidden"}}>{step_one_data?.user_account_number}</Snippet>
               </article>
            }
            {
               step_one_data?.status == "complated" &&  <article className="flex gap-2">
              <Button as={Link} href="/" onPress={() => {
                Cookies.remove("exchangeId")
               setTime(null)
                setCurrentSteps(0)
              }} color="success" className="text-default-50 font-semibold">Start New Exchange</Button>
              <Button as={Link} onPress={() => Cookies.remove("exchangeId")} href="/dashboard" color="warning">Go Dashboard</Button>
            </article>
            }
            {
               step_one_data?.status == "refund" &&  <article className="flex gap-2">
              <Button as={Link} href="/" onPress={() => {
                Cookies.remove("exchangeId")
                setTime(null)
                setCurrentSteps(0)
              }} color="success" className="text-default-50 font-semibold">Start New Exchange</Button>
              <Button as={Link} onPress={() => Cookies.remove("exchangeId")} href="/dashboard" color="warning">Go Dashboard</Button>
            </article>
            }
            {
               step_one_data?.status == "rejected" &&  <article className="flex gap-2">
              <Button as={Link} href="/" onPress={() => {
                Cookies.remove("exchangeId")
                setCurrentSteps(0)
              }} color="success" className="text-default-50 font-semibold">Start New Exchange</Button>
              <Button as={Link} onPress={() => Cookies.remove("exchangeId")} href="/dashboard" color="warning">Go Dashboard</Button>
            </article>
            }
           
          </div>
        </CardBody>
      </Card>

    </Animation.Slide>
  )





  return (
    <>
      <main className='h-screen gap-5 flex items-center  flex-col md:justify-center pt-10'>

        <div className="space-y-3 w-full p-2 flex flex-col justify-center items-center">

          <Steps current={currentSteps} className="flex justify-between w-full lg:w-4xl">
            <Steps.Item />
            <Steps.Item />
            <Steps.Item title={step_one_data?.status=="waiting"  ? <h1 className="font-bold text-warning-500">Waiting</h1>: step_one_data?.status=="complated" ?
            <h1 className="font-bold text-success-500">Complated</h1> : step_one_data?.status=="refund" ?  <h1 className="font-bold text-warning-500">Refunded</h1> :
            step_one_data?.status=="rejected" && <h1 className="font-bold text-danger-500">Rejected</h1>
            } icon={step_one_data?.status=="complated" ? <CheckCircle className="text-primary-500"/> :
             step_one_data?.status=="waiting" ? <Spinner color="warning" variant="simple" /> : 
             step_one_data?.status=="refund" ?  <RotateCcw className="text-warning-500"/> : step_one_data?.status=="rejected" ?  <CircleX className="text-danger-500"/> : undefined  } />
          </Steps>


          <div className="w-full flex justify-center items-center md:justify-center md:items-center">
            {currentSteps == 0 && StepOneForm()}
            {currentSteps == 1 && StepTwoForm()}
            {currentSteps == 2 && StepThreeForm()}
          </div>



        </div>

        <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" classNames={{
          backdrop: "bg-danger-500/30"
        }} aria-label="token user modal">
          <ModalContent>
            <ModalHeader>
              <h1>Login You Account</h1>

            </ModalHeader>
            <ModalBody>
              <p>Please login you account by using email and password
                if you new user and not have account please click register button to create account
                if you have account clcik login and use you email and password
              </p>
            </ModalBody>
            <ModalFooter>
              <Button as={Link} href="/auth/register" color="primary">Register</Button>
              <Button as={Link} href="/auth/login" color="danger" variant="ghost">Login</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </main>


    </>
  )





}


