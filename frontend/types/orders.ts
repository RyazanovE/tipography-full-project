export interface Order {
  id: number
  info: Info
  items: Item[]
  status: string
  createdAt: Date
  updatedAt: Date
  orderNumber: string
}

export interface Info {
  deliveryInfo: DeliveryInfo
  clientInfo: ClientInfo
}

export interface DeliveryInfo {
  tkInfo: TkInfo | null
  addressInfo: AddressInfo | null
  deliveryMethod: DeliveryMethod
}

export interface Item {
  id: number
  type: string
  guestId: null
  options: Options
  fileName: string
  quantity: number
  createdAt: Date
  updatedAt: Date
}

export interface Options {
  size: string
  summ: number
  type: string
  color: string
  holes: boolean
  amount: string
  format: string
  corners: boolean
  material: string
  printType: string
  timestamp: number
  designType: string
  lamination: string
  productionTime: string
  originalFileName: string
}

export interface ClientInfo {
  fio: string
  phone: string
  email: string
}

export interface AddressInfo {
  city: string
  street: string
  house: string
  room: string
  comment: string
}

export interface TkInfo {
  address: string
}

export interface OrderPayload {
  clientInfo: ClientInfo
  deliveryInfo: {
    deliveryMethod: DeliveryMethod
    addressInfo: AddressInfo | null
    tkInfo: TkInfo | null
  }
}

export type ConfirmationStep = 1 | 2

export type AuthMethod = 1 | 2 | null

export type DeliveryMethod = 1 | 2 | 3 | null
