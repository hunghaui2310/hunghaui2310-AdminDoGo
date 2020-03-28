export class ProductModel {
  id: number;
  productName: string;
  price: number;
  numLike: number;
  discount: number;
  urlImage: string;
  realPrice: number;
  categoryName: string;
  description: string;
  productNew: boolean;
  categoryId: number;
  numProInCart: number;
  total: number;
  createDate: string;
  codeDiscount: string;
  numBuy: number;
  priceFrom: number;
  priceTo: number;
  bigFile: string;
  smallFile: string;

  // tslint:disable-next-line:max-line-length
  constructor(id?: number, productName?: string, price?: number, numLike?: number, discount?: number, urlImage?: string, realPrice?: number,
              categoryName?: string, description?: string, productNew?: boolean, categoryId?: number, numProInCart?: number, total?: number,
              createDate?: string, codeDiscount?: string, numBuy?: number, fromPrice?: number, toPrice?: number, bigFile?: string, smallFile?: string) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.numLike = numLike;
    this.discount = discount;
    this.urlImage = urlImage;
    this.realPrice = realPrice;
    this.categoryName = categoryName;
    this.description = description;
    this.productNew = productNew;
    this.categoryId = categoryId;
    this.numProInCart = numProInCart;
    this.total = total;
    this.createDate = createDate;
    this.codeDiscount = codeDiscount;
    this.numBuy = numBuy;
    this.priceFrom = fromPrice;
    this.priceTo = toPrice;
    this.bigFile = bigFile;
    this.smallFile = smallFile;
  }
}
