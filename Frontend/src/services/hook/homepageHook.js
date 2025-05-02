import {useQuery} from '@tanstack/react-query'
import { PetFetch,ProductFetch } from '../api/homepageAPI'

export const PetFetchHook = () => 
    useQuery({
        queryKey: ['Homepage/MostSoldPet'],
        queryFn: ()=>PetFetch()
        
    });

export const ProductFetchHook =()=>
    useQuery({
        queryKey: ['Homepage/MostSoldProduct'],
        queryFn: ()=>ProductFetch()
    });