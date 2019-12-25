import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './style.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {
            "page": 1,
            "pages": 2,
            "total": 15,
            "limit": 10
        }
    };

    componentDidMount() {
        this.loadProducts();
    }


    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?_page=${page}&_limit=10`);

        this.setState({ products: response.data });
    }

    prevPage = () => {
        const { productInfo } = this.state;

        if (productInfo.page === 1) return;

        this.loadProducts(productInfo.page -= 1);
    }

    nextPage = () => {
        const { productInfo } = this.state;

        if (productInfo.page === productInfo.pages) return;

        this.loadProducts(productInfo.page += 1);
    }


    render() {
        const { products, productInfo } = this.state;

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product.id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/product/${product.id}`}>Acessar</Link>
                    </article>
                ))}

                <div className="actions">
                    <button disabled={productInfo.page === 1} onClick={this.prevPage}>Voltar</button>
                    <button disabled={productInfo.page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        );
    }
}