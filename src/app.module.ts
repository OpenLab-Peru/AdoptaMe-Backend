import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CountryModule } from './country/country.module';
import { DepartmentModule } from './department/department.module';
import { DistrictModule } from './district/district.module';
import { AdoptionRuleModule } from './adoption-rule/adoption-rule.module';
import { PetModule } from './pet/pet.module';
import { AdoptionModule } from './adoption/adoption.module';
import { formatError } from './common/format-error.graphql';
import { HttpError } from './common/classes/http-error.class';

@Module({
  imports: [
    CommonModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      formatError
    }),
    UserModule,
    FavoriteModule,
    CountryModule,
    DepartmentModule,
    DistrictModule,
    AdoptionRuleModule,
    PetModule,
    AdoptionModule
  ],
})
export class AppModule {}
