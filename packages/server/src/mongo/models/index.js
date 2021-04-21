import { Schema } from 'mongoose';
import mongooseClient from '../connection';

const smartContractSchema = new Schema(
  {
    contractType: {
      type: String,
      enum: ['marketplace', 'erc20', 'erc721'],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    abi: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: 'smart-contract' },
);

const defaultProjection = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

smartContractSchema.statics.findAll = function (projection) {
  return this.find({}, { ...defaultProjection, ...projection });
};

smartContractSchema.statics.findMarketplace = function (projection) {
  return this.findOne({ contractType: 'marketplace' }, { ...defaultProjection, ...projection });
};

smartContractSchema.statics.findERC20 = function (projection) {
  return this.findOne({ contractType: 'erc20' }, { ...defaultProjection, ...projection });
};

smartContractSchema.statics.findERC721 = function (projection) {
  return this.findOne({ contractType: 'erc721' }, { ...defaultProjection, ...projection });
};

const SmartContract = mongooseClient.model('SmartContract', smartContractSchema);

export { SmartContract };
