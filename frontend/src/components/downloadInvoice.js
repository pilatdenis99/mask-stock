const easyinvoice = require("easyinvoice");
require("http");

function downloadInvoice(order, hospital) {
  const data = {
    client: {
      company: order.hospital_Name,
      address: "",
      zip: Math.floor(Math.random() * 1000000),
      city: hospital.city,
      country: hospital.country,
    },
    sender: {
      company: "Mask Stock",
      address: "Sample Street 123",
      zip: "1234 AB",
      city: "Sampletown",
      country: "Samplecountry",
    },
    images: {
      logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
    },
    information: {
      number: `${new Date().getFullYear()}-${Math.floor(
        Math.random() * 100000
      )}`,
      date: new Date(order.createdAt).toLocaleDateString(),
      "due-date": new Date(
        new Date(order.createdAt).getTime() + 1296000000
      ).toLocaleDateString(),
    },
    products: [
      {
        quantity: order.ammount,
        description: order.items,
        "tax-rate": order.vat,
        price: order.price_Per_Piece,
      },
    ],
    "bottom-notice": "Kindly pay your invoice within 15 days",
    settings: {
      currency: hospital.currency,
    },
  };

  easyinvoice.createInvoice(data, function (result) {
    easyinvoice.download(
      `Invoice-${hospital.name}-${order._id}.pdf`,
      result.pdf
    );
  });
}

module.exports = downloadInvoice;
