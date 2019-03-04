import initPlus from '../plus';
const callApi = (name,...arg) => {
	return new Promise((reslove,reject) => {
		initPlus.then(plus => {
			let webview;
			webview = plus.webview[name](...arg);
			reslove(webview||null);
		}).catch(reject);
	});
		
}
/**
 * @desc 创建新的Webview窗口
 * @param url String 可选 新窗口加载的HTML页面地址
 * @param id String 可选 新窗口的标识
 * @param styles WebviewStyles 可选 创建Webview窗口的样式（如窗口宽、高、位置等信息）
 * @param extras JSON 可选 创建Webview窗口的额外扩展参数
 * @return Webview窗口对象
 */
export const create = ({url, id, styles, extras}) => {
	callApi('create', url, id, styles, extras).then(webview => {
		webview.show();
	});
}

export const currentWebview = () => {
	return callApi('currentWebview');
}