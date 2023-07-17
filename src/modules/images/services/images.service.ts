import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { S3 } from "aws-sdk";
import { v4 as uuid } from 'uuid';
import { CreateImageDto } from '../dto/create-image.dto';
import { Image } from '../entities/image.entity';
import { IImagesRepository } from '../repositories/i-images-repository';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imagesRepository: IImagesRepository,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const image = await this.imagesRepository.save(createImageDto);

    return { id: image.image_id };
  }

  async uploadFile(dataBuffer: Buffer, fileName: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: dataBuffer,
      Key: `${uuid()}-${fileName}`,
    }).promise();

    const fileStorageInDB = ({
      fileName: fileName,
      fileUrl: uploadResult.Location,
      key: uploadResult.Key,
    });

    return fileStorageInDB;
  }

  async findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Image>> {
    return this.imagesRepository.paginate(paginateRequestDto);
  }

  async linkToGame(imageIds: number[], gameId: number) {
    const links = await this.imagesRepository.linkToGame(imageIds, gameId);

    return links;
  }
}
