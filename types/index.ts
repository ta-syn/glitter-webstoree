export interface Product {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    image: string;
    images?: string[];
    category: string;
    rating?: number;
    reviews?: number;
    isNew?: boolean;
    onSale?: boolean;
    description?: string;
    stock?: 'in-stock' | 'low-stock' | 'out-of-stock';
    colors?: string[];
    size?: string;
}
