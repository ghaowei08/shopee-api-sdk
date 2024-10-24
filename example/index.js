const shopee = require("../dist");

const baseUrl = "https://partner.shopeemobile.com";
const shopId = 911415871;
const partnerId = 2003208;
const partnerKey =
  "76536f7959794f4e416f596171676444536b48655763504f6e454e6f4b714b62";
const accessToken = "6d6d6d4372556342596d66716f63496e";
const refreshToken = "615a46586c54756b4275716b6b61535a";

const publicGroup = new shopee.PublicGroup({
  baseUrl,
  shopId,
  partnerId,
  partnerKey,
  refreshToken,
});

const orderGroup = new shopee.OrderGroup({
  baseUrl,
  shopId,
  partnerId,
  partnerKey,
  accessToken,
});

const logisticGroup = new shopee.LogisticGroup({
  baseUrl,
  shopId,
  partnerId,
  partnerKey,
  accessToken,
});

async function refreshAccessToken() {
  try {
    const req = await publicGroup.refreshAccessToken();
    console.log(req);
  } catch (err) {
    console.log(err);
  }
}

async function getOrderList() {
  try {
    const from = new Date();
    from.setDate(new Date().getDate() - 15);
    const to = new Date();
    const req = await orderGroup.getOrderList({
      page_size: 50,
      time_from: Math.floor(from.getTime() / 1000),
      time_to: Math.floor(to.getTime() / 1000),
      time_range_field: "create_time",
    });
    console.table(req.response.order_list);
  } catch (err) {
    console.error(err);
  }
}

async function getShipmentList() {
  try {
    const req = await orderGroup.getShipmentList({
      page_size: 50,
    });
    console.table(req);
  } catch (err) {
    console.error(err);
  }
}

async function getOrderDetail() {
  try {
    const req = await orderGroup.getOrderDetail({
      order_sn_list: [
        "2410239NBTMVHQ",
        "24102286136GES",
        "24102148YEF9GY",
        "24102148KHXX11",
        "2410203VG46W3J",
        "2410203PDBXY49",
        "2410203P6U2ES8",
        "2410190P669JA9",
        "241019030WKGV5",
        "241019VU0DV1DW",
        "241018TJERQJHR",
        "241017S7NBD7RS",
        "241016PSMMCMR9",
        "241016NUCVNP5Y",
        "241016NRUYDYE6",
        "241015JXXN1DXY",
        "241014J1DNY12M",
        "241014HW1Y4U99",
        "241013E1CHKMQF",
        "241012CRMPE7AX",
        "241012CFBVS5EC",
        "241012CEPTHUAJ",
        "241012CEAMG952",
        "241012CA1BUEWE",
        "241012ATGC2GS7",
        "241011AF62A3NH",
        "2410119KDDN99P",
        "2410119BM36N69",
        "2410119AH0QC5R",
        "24101199U6MAH1",
        "241011923MFQA3",
        "24101190NG5YU9",
        "2410118UMWRCSC",
        "2410118TTY4T62",
        "2410107YUAKB6S",
        "2410107NKPURUV",
        "2410107EMQEMGN",
        "2410106UDCXKKE",
        "2410106HU33A8C",
        "2410105GQ3S00J",
        "2410095EP4PGWN",
        "2410095CYXWNAJ",
        "2410095A2M2STN",
        "2410094VNWF7T9",
      ],
      response_optional_fields: [
        "buyer_user_id",
        "buyer_username",
        "estimated_shipping_fee",
        "recipient_address",
        "actual_shipping_fee",
        "goods_to_declare",
        "note",
        "note_update_time",
        "item_list",
        "pay_time",
        "dropshipper",
        "dropshipper_phone",
        "split_up",
        "buyer_cancel_reason",
        "cancel_by",
        "cancel_reason",
        "actual_shipping_fee_confirmed",
        "buyer_cpf_id",
        "fulfillment_flag",
        "pickup_done_time",
        "package_list",
        "shipping_carrier",
        "payment_method",
        "total_amount",
        "invoice_data",
        "no_plastic_packing",
        "order_chargeable_weight_gram",
        "return_request_due_date",
        "edt",
      ],
    });
    console.log(req.response.order_list);
  } catch (err) {
    console.error(err);
  }
}

async function getShippingParameter() {
  try {
    const req = await logisticGroup.getShippingParameter({
      order_sn: "24102286136GES",
    });
    console.log(req.response);
  } catch (err) {
    console.error(err);
  }
}
// refreshAccessToken();
getShippingParameter();
