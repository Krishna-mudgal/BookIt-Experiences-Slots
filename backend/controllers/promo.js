const { promoModel } = require("../models/promo");

const handleCreatePromo = async (req, res) => {
  try {
    const { code, type, value, minimumAmount, isActive, expiresAt } = req.body;

    if (!code || !type || value == undefined) {
      return res.status(400).json({ message: "code, type and value are required" });
    }

    const promoData = {
      code: code.toUpperCase(), 
      type,
      value,
      minimumAmount: minimumAmount || 0,
      isActive: isActive !== undefined ? isActive : true,
      expiresAt,
    };

    const promo = await promoModel.create(promoData);

    return res.status(201).json({ message: "Promo created successfully", promo });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Promo code already exists" });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleVerifyPromo = async (req, res) => {
    try {
    const { code, amount } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Promo code is required" });
    }

    const promo = await promoModel.findOne({ code: code.toUpperCase(), isActive: true });
    
    if (!promo) {
      return res.status(404).json({ message: "Promo code not found or inactive" });
    }

    if (promo.expiresAt && promo.expiresAt < new Date()) {
      return res.status(400).json({ message: "Promo code has expired" });
    }

    if (promo.minimumAmount && amount < promo.minimumAmount) {
      return res.status(400).json({
        message: `Minimum amount for this promo code is ${promo.minimumAmount}`
      });
    }

    return res.status(200).json({
      message: "Promo code is valid",
      promo: {
        code: promo.code,
        type: promo.type,
        value: promo.value,
        minimumAmount: promo.minimumAmount,
        expiresAt: promo.expiresAt,
      }
    });
  } catch (error) {
    console.error("Error verifying promo code:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
    handleCreatePromo,
    handleVerifyPromo
}