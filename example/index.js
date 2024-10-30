const shopee = require("../npm/dist");
const fs = require("fs");
require("dotenv").config();

const baseUrl = process.env.baseUrl;
const partnerId = process.env.partnerId;
const partnerKey = process.env.partnerKey;
const code = process.env.code;
const shopId = process.env.shopId;
const accessToken = process.env.accessToken;
const refreshToken = process.env.refreshToken;

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

const productGroup = new shopee.ProductGroup({
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

// Public
// getAccessToken();
// refreshAccessToken();

// Product
// getCategory();
// getAttributes();
// getBrands();

const order_sn_list = ["241028PJJEXEHN"];
// Order
// getOrderList();
// getOrderDetail();
// getShipmentList()

// Logistic
// getShippingParameter();
// getTrackingNumber();
// shipOrder();

async function getAccessToken() {
  try {
    const req = await publicGroup.getAccessToken({
      code,
      partner_id: partnerId,
      shop_id: shopId,
    });
    console.log(req);
  } catch (err) {
    console.error(err);
  }
}

async function refreshAccessToken() {
  try {
    const req = await publicGroup.refreshAccessToken({ shop_id: shopId });
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
      order_sn_list,
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
      order_sn: order_sn_list[2],
    });
    console.log(JSON.stringify(req));
  } catch (err) {
    console.error(err);
  }
}

async function getTrackingNumber() {
  try {
    const req = await logisticGroup.getTrackingNumber({
      order_sn: "241028PEPGK1WJ",
    });
    console.log(req);
  } catch (err) {
    console.error(err);
  }
}

async function shipOrder() {
  try {
    const req = await logisticGroup.shipOrder({
      order_sn: order_sn_list[2],
      pickup: {
        address_id: 2574,
        pickup_time_id: "1730098800_1730098800",
      },
    });
    console.log(req);
  } catch (err) {
    console.error(err);
  }
}

async function getCategories() {
  try {
    const req = await productGroup.getCategories({
      language: "en",
    });
    fs.writeFileSync(
      "category.json",
      JSON.stringify(req.response.category_list)
    );
    console.table();
  } catch (err) {
    console.error(err);
  }
}

async function getAttributes() {
  try {
    const req = await productGroup.getAttributes({
      language: "en",
      category_id: 100734,
    });
    console.log(req);
  } catch (err) {
    console.error(err);
  }
}

async function getBrands() {
  try {
    const req = await productGroup.getBrands({
      offset: 0,
      page_size: 100,
      category_id: 100756,
      status: 1,
      language: "en",
    });
    console.log(req.response);
  } catch (err) {
    console.error(err);
  }
}

// const category = require("./category.json");
// console.table(
//   category.reduce((pv, curr) => {
//     let categoryFound = curr;
//     let hieracachy = curr.original_category_name;
//     while (categoryFound.parent_category_id) {
//       const newCat = category.find(
//         (e) => e.category_id == categoryFound.parent_category_id
//       );
//       hieracachy = newCat.original_category_name + " > " + hieracachy;
//       categoryFound = newCat;
//     }
//     pv.push({ categoryId: curr.category_id, hieracachy });
//     return pv;
//   }, [])
// );
