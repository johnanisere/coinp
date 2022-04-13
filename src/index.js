import * as zoid from "zoid/dist/zoid.frame.min";
import { node, dom } from "jsx-pragmatic";

const Widget = zoid.create({
  tag: "coinprofile-payment-gateway", //Same tag would be used in the child component
  dimensions: {
    //The default size the widget should display in
    width: "100%",
    height: "100%",
  },
  url: ({ props }) => {
    return {
      dev: "http://localhost:3004",
      staging: "https://staging.paymentgateway.coinprofile.co/",
      production: "https://paymentgateway.coinprofile.co/",
      alpha: "https://alpha-paymentgateway.coinprofile.co/"
    }[props.env];
  },
  containerTemplate: function containerTemplate({
    uid,
    doc,
    frame,
    prerenderFrame,
  }) {
    return node(
      "div",
      { id: uid, class: "container" },
      node(
        "style",
        null,
        `
            #${uid}.container {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              overflow-y: hidden;
              z-index:3000000000
            }
            iframe{
              width:100%;
              height:100%;
            }
        `
      ),
      node("node", { el: frame }),
      node("node", { el: prerenderFrame })
    ).render(dom({ doc }));
  },
  props: {
    env: {
      type: "string",
      default: () => "production",
    },
    paymentType:{
      type: "string",
      required: true,
    },
    recipientUsername: {
      type: "string",
      required: true,
    },
    businessId:{
      type: "string",
      required: true,
    },
    incomingAmount: {
      type: "number",
      required: true,
    },
    outgoingCurrency: {
      type: "string",
      required: true,
    },
    customerEmail: {
      type: "string",
      required: true,
    },
    incomingCurrency: {
      type: "string",
      required: false,
    },
    transactionId: {
      type: "string",
      required: false,
    },
    country:{
      type: "string",
      required: false,
    },
    accountNumber:{
      type: "string",
      required: false,
    },
    accountName:{
      type: "string",
      required: false,
    },
    bank:{
      type: "string",
      required: false,
    },
    bankCode:{
      type: "string",
      required: false,
    },
    rateKey: {
      type: "string",
      required: false,
    },
    onFinalise:{
      type: "function",
      required: false,
    },
    other:{
      type: 'object',
      serialization: 'json'
    }
  },
});

export default Widget;
