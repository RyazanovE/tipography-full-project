import type { ClientInfo, AddressInfo, TkInfo, DeliveryMethod, OrderPayload } from '~/types/orders'

export const formOrderPayload = (
  clientInfo: ClientInfo,
  addressInfo: AddressInfo,
  tkInfo: TkInfo,
  deliveryMethod: DeliveryMethod
): OrderPayload => {
  return {
    clientInfo,
    deliveryInfo: {
      deliveryMethod,
      addressInfo: addressInfo.street
        ? {
            city: addressInfo.city,
            street: addressInfo.street,
            house: addressInfo.house,
            room: addressInfo.room,
            comment: addressInfo.comment
          }
        : null,
      tkInfo: tkInfo.address
        ? {
            address: tkInfo.address
          }
        : null
    }
  }
}
