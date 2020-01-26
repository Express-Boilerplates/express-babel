import mongoose from "mongoose";

const giftCardRecordScema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    default: 20
  },
  date: {
    type: Date,
    required: true
  }
});

const giftCardRecord = mongoose.model("giftCardRecord", giftCardRecordScema);

export default giftCardRecord;
