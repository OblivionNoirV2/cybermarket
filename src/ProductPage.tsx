import { useParams } from 'react-router-dom';
import * as pi from './ProductInfo';
import { ImagesArray } from './Home';
interface ProductInfoProps {
    price: number;
    item_number: number;
    name: string;
}

function getProductData(item_number: number): ProductInfoProps | undefined {
    for (let [name, info] of Object.entries(pi.product_info)) {
        if (info.item_number === item_number) {
            return { name, ...info };
        }
    }
}
const product_name_lookup: { [key: string]: string } = {
    'ai': 'Aeon Plus AI Assistant',
    'armor': 'Deflector X Laser Armor',
    'katana': 'Shogun X Laser Katana',
    'cpu': 'Nova Centauri 1024 core, 98.6 GHz CPU',
    'gpu': 'Hyperion Z 9090zi GPU',
    'glasses': 'VisionX Coding Glasses',
    'pill': 'Prometheus Pill',
    'chip': 'Pandora V4.0 Neural Chip',
    'launcher': 'Rocket Launcher'

}
const ProductPage = () => {
    const { itemnumber } = useParams();
    const item_number_int = parseInt(itemnumber || '0');
    const product_data = getProductData(item_number_int);

    if (!product_data) {
        return <div>Product not found</div>;
    }

    //find the image path if it exists
    const product_image = ImagesArray.find(
        img => img.includes(product_data.name)
    );

    return (
        <main className=" w-full ">
            <section className='flex flex-row bg-red-500 mx-48'>
                <section className=' flex flex-col'>
                    <h1 className='text-8xl '>{product_name_lookup[product_data.name]}</h1>
                    {
                        product_image &&
                        <img src={product_image} />
                    }
                </section>
                <section className='flex flex-col'>
                    <p>{pi.getImageCaption(product_data.name, "long")}</p>
                    <h2>{product_data.price}</h2>
                    <button>Add to cart</button>
                </section>
            </section>
        </main>
    );
};


export default ProductPage;
