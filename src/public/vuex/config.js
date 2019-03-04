import * as mutations from './mutations'

export default{
	state: {
		loadingNum: 0
	},
	mutations: {
		[mutations.LOADING_SHOW]: state => state.loadingNum ++,
		[mutations.LOADING_HIDE]: state => {
			if(state.loadingNum>0) state.loadingNum --
		},
	}
}
