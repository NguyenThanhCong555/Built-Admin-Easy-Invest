import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { StakeState } from './type';

export const initialState: StakeState = {
  stakeChangeId: -1,
  products: [],
};

const slice = createSlice({
  name: 'stake',
  initialState,
  reducers: {
    getStakeOfEachProject(state, action: PayloadAction<StakeState | any>) {
      const { projectId, products } = action.payload;
      let existingProduct = state.products?.find(
        product => product?.project_id === projectId,
      );
      if (!existingProduct) {
        state.products?.push({
          project_id: projectId,
          data: products,
        });
      } else {
        state.products?.map(product => {
          if (product.project_id === projectId) {
            product.data = products;
          }
        });
      }
    },

    createStakeOfEachProject(state, action: PayloadAction<StakeState | any>) {
      const { projectId, data } = action.payload;
      state.products?.map(product => {
        if (product?.project_id === projectId) {
          product.data.push(data);
        }
      });
    },

    repairStakeOfEachProject(state, action: PayloadAction<StakeState | any>) {
      const { projectId, data } = action.payload;
      let existingProduct = state.products?.find(
        product => product?.project_id === projectId,
      );
      let index = existingProduct?.data.findIndex(stake => {
        return stake.id === data.id;
      });
      if (index && index !== -1) {
        existingProduct?.data.splice(index, 1, data);
      }
    },
    setLockStake(state, action: PayloadAction<StakeState | any>) {
      const { projectId, data, status } = action.payload;
      console.log(data, status);
      let existingProduct = state.products?.find(
        product => product?.project_id === projectId,
      );

      var stakeToUpdate = existingProduct?.data.find(stake => {
        return stake.id === data.id;
      });
      if (stakeToUpdate) {
        stakeToUpdate.status = status;
      }
    },
    setStakeChangeId(state, action: PayloadAction<StakeState>) {
      state.stakeChangeId = action.payload.stakeChangeId;
    },
    resetStakeChangeId(state) {
      state.stakeChangeId = -1;
    },

    resetStakeAll() {
      return { ...initialState };
    },
  },
});

const { actions, reducer } = slice;
export const stakeActions = actions;
export const stakeReducer = reducer;
