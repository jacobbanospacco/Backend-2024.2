import img1 from '../assets/images/image-retro-pcs.jpg'
import img2 from '../assets/images/image-top-laptops.jpg'
import img3 from '../assets/images/image-gaming-growth.jpg'



import { Article } from "./Article"

export const ArticlesContainer = () => {
  return (
    <section className="mt-6 sm:flex" >
    <Article
    img={img1}
    number='01'
    title='Estadistica'
    text='_____________________________________________'
    
    />
    <Article
     img={img2}
     number='02'
     title='Por departamento'
     text='___________________________________________'

    />
    <Article
     img={img3}
     number='03'
     title='Sismos reportados'
     text='__________________________________________'

    />
    </section>
  )
}