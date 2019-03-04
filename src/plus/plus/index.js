const initPlus = new Promise((reslove,reject) => {
	try{
		if(window.plus){
			reslove(window.plus);
		}else {
			document.addEventListener("plusready", function() {
				reslove(window.plus);
			}, false);
		}
	}catch(e){
		reject(e);
	}
});
export default initPlus;