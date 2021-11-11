import s from "./ProductItem.module.scss"

const ProductItem = ({img, link, name, price, category}) => {
  return <a className={s.productItem} href={link}>
    <div className={s.topSide}>
      <img className={s.productImg} src={img} width={220} alt="Product" />
      <div className={s.productName}>{name.length > 50 ? name.slice(0,50) + "..." : name}</div>
    </div>
    
    <div className={s.bottomSide}>
      <div className={s.productCategory}>{category}</div>
      <div className={s.productPrice}><span>Price:</span> {price}$</div>
    </div>
  </a>
}
export default ProductItem