const router = require("express").Router();
const axios = require("axios");

router.get("/", (req, res) => {
  res.json("> > > > Welcome To Shopify Discount API < < < <");
});

router.get("/price_rules", async (req, res) => {
  const url = `https://${process.env.API_KEY}:${process.env.PASSWORD}@${process.env.SHOP}/admin/api/2021-10/price_rules.json`;
  try {
    const { data } = await axios.get(url);
    res.status(200).json({ url, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error: error.response });
  }
});

router.get("/discounts/:price_rule_id", async (req, res) => {
  const { price_rule_id } = req.params;
  const url = `https://${process.env.API_KEY}:${process.env.PASSWORD}@${process.env.SHOP}/admin/api/2021-10/price_rules/${price_rule_id}/discount_codes.json`;
  try {
    const { data } = await axios.get(url);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error: error.response });
  }
});

router.get("/discount_codes", async (req, res) => {
  const priceRuleURL = `https://${process.env.API_KEY}:${process.env.PASSWORD}@${process.env.SHOP}/admin/api/2021-10/price_rules.json`;
  const discountCodeURL = (priceRuleId) =>
    `https://${process.env.API_KEY}:${process.env.PASSWORD}@${process.env.SHOP}/admin/api/2021-10/price_rules/${priceRuleId}/discount_codes.json`;

  let publicDiscounts = [];

  try {
    const { data: priceRulesResp } = await axios.get(priceRuleURL);

    for (let i = 0; i < priceRulesResp.price_rules.length; i++) {
      let rule = priceRulesResp.price_rules[i];
      const { data: discountCodesResp } = await axios.get(discountCodeURL(rule.id));

      console.log(discountCodesResp);

      if (discountCodesResp.discount_codes.length === 1) {
        publicDiscounts.push({
          ...discountCodesResp.discount_codes[0],
          ...rule
        });
      }
    }
    res.status(200).json(publicDiscounts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error });
  }
});

module.exports = router;
