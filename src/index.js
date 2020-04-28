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
    username: {
      type: "string",
      required: true,
    },
    amount: {
      type: "number",
      required: true,
    },
    currency: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    selectedCurrency: {
      type: "string",
      required: false,
    },
    transactionId: {
      type: "string",
      required: false,
    },
    onFinalise: {
      type: "function",
      required: false,
    },
  },
});

export default Widget;
