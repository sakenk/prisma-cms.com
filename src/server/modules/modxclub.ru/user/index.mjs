

import PrismaModule from "@prisma-cms/prisma-module";

import UserModule, {
  UserPayload,
} from "@prisma-cms/user-module";

import MergeSchema from 'merge-graphql-schemas';

import path from 'path';

const moduleURL = new URL(import.meta.url);

const __dirname = path.dirname(moduleURL.pathname);

const { fileLoader, mergeTypes } = MergeSchema;


export class ModxclubUserProcessor extends UserPayload{

  
  async signup(source, args, ctx, info){

    let {
      data: {
        username,
        email,
        password,
      },
    } = args;


    if(!username){
      this.addFieldError("username", "Не указан логин");
    }

    if(!email){
      this.addFieldError("email", "Не указан емейл");
    }

    if(!password){
      this.addFieldError("password", "Не указан пароль");
    }


    return super.signup(null, source, args, ctx, info);
  }

}


class ModxclubUserModule extends UserModule {


  // constructor() {

  //   super();

  //   this.mergeModules([
  //     SocialModule,
  //   ]);

  // }

  // getApiSchema(types = []) {


  //   let apiSchema = super.getApiSchema(types, [
  //     "Mutation",

  //     "UserCreateInput",

  //     "ResourceCreateInput",
  //     "ResourceUpdateInput",
  //   ]);


  //   let schema = fileLoader(__dirname + '/schema/api/', {
  //     recursive: true,
  //   });

  //   apiSchema = mergeTypes([apiSchema.concat(schema)], { all: true });

  //   return apiSchema;

  // }



  getResolvers() {


    let resolvers = super.getResolvers();

    const {
      Mutation: {
        signup,
        ...Mutation
      },
      ...other
    } = resolvers;

 

    return {
      Mutation: {
        ...Mutation,
        signup: (source, args, ctx, info) => {

          return new ModxclubUserProcessor(ctx).signup(source, args, ctx, info);
        },
      },
      ...other,
    };

  }


}


export default ModxclubUserModule;