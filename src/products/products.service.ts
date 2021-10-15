import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({ _id: id });
  }

  async findCategories(): Promise<String[]> {
    const products = await this.productModel.find();
    return products
      ? [...new Set(products.map((product) => product.category))]
      : [];
  }

  async update(id: string, item: UpdateProductDto): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, item, { new: true });
  }

  async remove(id: string): Promise<Product> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
