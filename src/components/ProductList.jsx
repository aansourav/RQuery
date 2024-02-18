import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";

const getProducts = async ({queryKey}) => {

    const response = await axios.get(`http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`);
    return response.data;
};

export default function ProductList({setID}) {
    const [page, setPage] = useState(1)
    const queryClient = useQueryClient();
    const {data: products, error, isLoading} = useQuery({
        queryKey: ["products", {page}],
        queryFn: getProducts,
        retry: false,
    })

    const handleClick = (id) => {
        setID(id)
    }

    const deleteMutation = useMutation({
        mutationFn: productId => axios.delete(`http://localhost:3000/products/${productId}`),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(['products'])
        }
    })

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };


    if (isLoading) return <div className="text-3xl text-green-800 font-bold">Fetching products...</div>
    if (error) return <div>An error occurred: {error.message}</div>
    return (
        <div className="flex flex-col justify-center items-center w-3/5">
            <h2 className="text-3xl my-2">Product List</h2>
            <ul className="flex flex-wrap justify-center items-center">
                {products.data && products.data.map((product) => (
                    <li key={product.id}
                        className="flex flex-col items-center m-2 border rounded-sm">
                        <img
                            className="object-cover h-64 w-96 rounded-sm"
                            src={product.thumbnail}
                            alt={product.title}/>
                        <p className="text-xl my-3">{product.title}</p>
                        <button onClick={() => handleClick(product.id)}>Show details</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div className='flex'>
                {
                    products.prev && (
                        <button
                            className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
                            onClick={() => setPage(products.prev)}> Prev </button>
                    )
                }
                {
                    products.next && (
                        <button
                            className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
                            onClick={() => setPage(products.next)}> Next </button>
                    )
                }

            </div>
        </div>
    )
}
