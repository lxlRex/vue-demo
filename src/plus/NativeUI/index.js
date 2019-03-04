import initPlus from '../plus';
const callApi = (name,...arg) => {
	initPlus.then(plus => {
		plus.nativeUI[name](...arg)
	}).catch(e => {
		console.warn(e);
	});
}
export const actionSheet = ({title,cancel = '取消',buttons,cancelCb}) => {
	callApi('actionSheet',{
			title,
			cancel,
			buttons
		},e => {
			let index = e.index;
			if(e.index == 0){
				cancelCb && cancelCb(cancel)
			}else {
				buttons[e.index-1].handler && buttons[e.index-1].handler();
			}
			
		}
	);
}
export const alert = (message, alertCB, title, buttonCapture) => {
	callApi('alert',message, alertCB, title, buttonCapture);
}
export const confirm = (message, confirmCB, title, buttons) => {
	callApi('confirm',message, confirmCB, {title, buttons});
}

export const previewImage = ({urls,background="#000",current=0,indicator="default",loop="true"}) => {
	callApi('previewImage',urls, {background,current,indicator,loop});
}