package e

// http 200 ok
// data: {
//		code: 200
//    msg :
//    data:
// }

var (
	OK = New(200, "ok")

	InvalidParams = New(400, "invalid params: ")
	Forbidden     = New(403, "forbidden: ")
	SystemError   = New(500, "system error")

	Unknown            = New(1000, "unknown error")
	DBError            = New(1001, "db error: ")
	QueryTooFrequently = New(1002, "请求太频繁")
	TokenError         = New(1003, "token error: ")

	SendSmsFailed           = New(2002, "send sms failed: ")
	InvalidSmsCode          = New(2003, "invalid sms code: ")
	UserNotExists           = New(2004, "user not exists: ")
	UserAlreadyIndentified  = New(2005, "user already identified: ")
	UserNotIndentified      = New(2006, "user not identified: ")
	IndentifyFailed         = New(2007, "identify failed: ")
	InvalidIndentifyMsg     = New(2008, "invalid indentify msg: ")
	UserAlreadyBindBankCard = New(2009, "user already bind bank card")
	UserHasNoBankCard       = New(2010, "用户没有银行卡")
	UserHasNoSecurePassword = New(2011, "用户没有设置安全密码")
	InvalidSecurePassword   = New(2012, "支付安全密码错误")

	CollectionsSoldOut        = New(3001, "藏品已售罄")
	CollectionsStockNotEnough = New(3002, "藏品库存不足")
	PublishNotStarted         = New(3003, "发售未开始")
	ExceedMaxBuy              = New(3004, "超出最大购买数量")
	CollectionsNotExist       = New(3005, "藏品不存在")

	OrderNotExists     = New(4001, "订单不存在: ")
	OrderTimeout       = New(4002, "订单已超时")
	OrderCanceled      = New(4003, "订单已取消")
	OrderPayerNotBuyer = New(4004, "此订单并非由您所创建")
	OrderAlreadyPaid   = New(4005, "订单已支付完成")

	WalletNotEnoughMoney = New(5001, "钱包余额不足")

	WidthDrawNotEnough = New(10002, "withdraw should >= 50")
	WithDrawOnceIn24H  = New(10003, "you can withdraw only once in 24 hours")

	UploadAvatarFailed = New(9001, "upload avatar failed: ")
)
