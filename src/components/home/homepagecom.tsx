"use client"
import { Button, Card, CardBody, Form, Image, Input, Select, SelectItem } from "@heroui/react"
import React, { useState } from "react"
import { Badge, Steps } from "rsuite"


interface IstepOne {
  from_current_name: string,
  to_current_name: string,
  from_current_img: string,
  to_current_img: string,
  from_current_amount: string,
  to_current_amount: string,
  account_number: string,
  user_account_number: string
}

export default function Homepagecom() {
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

  // all curents
  const allCurrents = [
    {
      current_name: "Evcplus",
      key: "evc",
      id: 1,
      rate: 5,
      min: 1,
      max: 1500,
      img: "https://i.ibb.co/Swsd9hdb/evc.png",
      symbol: "USD",
      code: "$",
      category: "fiat",
      account_number: "0616825183"
    },
    {
      current_name: "Zaad",
      key: "zaad",
      id: 1,
      rate: 2,
      min: 5,
      max: 2000,
      img: "https://i.ibb.co/Hf33j9LY/zaad.png",
      symbol: "USD",
      code: "$",
      category: "fiat",
      account_number: "0616825183"
    },
    {
      current_name: "Sahal",
      key: "sahal",
      id: 1,
      rate: 4,
      min: 4,
      max: 4000,
      img: "https://i.ibb.co/WWLFRP8N/sahal.png",
      symbol: "USD",
      code: "$",
      category: "fiat",
      account_number: "0616825183"
    },
    {
      current_name: "Payeer",
      key: "payer",
      id: 1,
      rate: 6,
      min: 3,
      max: 3000,
      img: "https://i.ibb.co/S4c3Yh2n/payer.png",
      symbol: "USD",
      code: "$",
      category: "fiat",
      account_number: "P1293092029"
    },


  ]

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

  const fromCurfilImg = allCurrents.find((e) => e.key == fromCurSymbol.fromcur)
  const toCurfilImg = allCurrents.find((e) => e.key == fromCurSymbol.tocur)
  const toCurrSelectItems = allCurrents.filter((item) => item.key !== fromCurfilImg?.key)
  const fromCurrSelectItems = allCurrents.filter((fromC) => fromC.key !== toCurfilImg?.key)

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

    setStepOneData({
      account_number: String(fromCurfilImg?.account_number) !== "undefined" ? String(fromCurfilImg?.account_number) : String(allCurrents.find((c) => c.key == "zaad")?.account_number),
      from_current_amount: String(dataInput.from_amount),
      from_current_img: String(fromCurfilImg?.img),
      from_current_name: String(dataInput.fromcur),
      to_current_amount: String(dataInput.to_amount),
      to_current_img: String(toCurfilImg?.img),
      to_current_name: String(dataInput.tocur),
      user_account_number: String(dataInput.to_current_addres)
    })
  }

  console.log(step_one_data)

  return (
    <>
      <main className='h-screen gap-5 items-center flex flex-col  pt-10'>

        <div className="space-y-3 w-full p-2 flex flex-col justify-center items-center">

          <Steps current={1} className="flex justify-between w-full lg:w-4xl">
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
          </Steps>

          <Card className="w-full lg:w-4xl md:w-3xl p-5">
            <CardBody>
              <Form onSubmit={handleSubmitExchangeForm} className="grid grid-cols-2 gap-6   sm:gap-3 p-2">
                {/* from amount select */}
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
                    && <Image className="w-12 h-10 rounded-full border-1 border-primary-500" src={fromCurfilImg && fromCurfilImg.img} />
                  }

                  name="fromcur" onChange={handleChangeSelect} label="Send" placeholder="Select from current">
                  {
                    fromCurrSelectItems.map((c) => (
                      <SelectItem startContent={<Image className="w-10 border-1 border-primary-500 h-10 rounded-full" src={c.img} />}
                        textValue={c.current_name} key={c.key} >
                        <div className="grid grid-cols-1">
                          <h1> {c.current_name}</h1>
                          <Badge style={{ width: "35px" }} color="violet" content={c.symbol} className="w-auto" />
                        </div>
                      </SelectItem>
                    ))
                  }
                </Select>
                {/* to amount select */}
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
                  startContent={toCurfilImg && <Image className="w-12 h-10 rounded-full border-1 border-primary-500" src={toCurfilImg && toCurfilImg.img} />

                  } label="Get"
                  placeholder="Select to current">
                  {
                    toCurrSelectItems.map((c) => (
                      <SelectItem startContent={<Image className="w-10 h-10 border-1 border-primary-500 rounded-full" src={c.img} />} textValue={c.current_name} key={c.key}>
                        <div className="grid grid-cols-1">
                          <h1> {c.current_name}</h1>
                          <Badge style={{ width: "35px" }} color="violet" content={c.symbol} className="w-auto" />
                        </div>
                      </SelectItem>
                    ))
                  }
                </Select>
                {/* from amount input */}
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

                {/* to amount input */}
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
                {
                  // {/* you number or address input */}
                  toCurfilImg?.category && <Input onChange={handleChangeAmount} className="col-span-2" classNames={{
                    description: "text-danger-500"
                  }} name="to_current_addres"
                    color={errorCurrents.errorAddressInput ? "danger" : "default"}
                    description={errorCurrents.errorAddressInput && errorCurrents.errorAddressInput}
                    label={`You ${toCurfilImg.current_name} ${toCurfilImg.category == "fiat" ? "Number" : "Address"}`} />


                }

                <Button type="submit" color="primary" className="col-span-2">Start Exchange</Button>
              </Form>
            </CardBody>
          </Card>

        </div>


      </main>


    </>
  )





}


