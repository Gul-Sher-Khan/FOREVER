const querySchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["resolved", "pending"], default: "pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

querySchema.index({ status: 1 });

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
