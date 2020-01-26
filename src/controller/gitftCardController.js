import giftCardRecord from "model/giftCardRecordModel";

export const createGiftCardRecord = async (req, res, next) => {
  const newGiftCardRecord = await giftCardRecord.create(req.body);

  return res.status(200).json({
    data: newGiftCardRecord
  });
};

export const readGiftCardRecord = async (req, res, next) => {
  const giftCards = await giftCardRecord.find();

  return res.status(200).json({
    data: giftCards
  });
};
