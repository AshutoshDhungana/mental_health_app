
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Reflection
 * 
 */
export type Reflection = $Result.DefaultSelection<Prisma.$ReflectionPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model ReflectionTag
 * 
 */
export type ReflectionTag = $Result.DefaultSelection<Prisma.$ReflectionTagPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reflection`: Exposes CRUD operations for the **Reflection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reflections
    * const reflections = await prisma.reflection.findMany()
    * ```
    */
  get reflection(): Prisma.ReflectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reflectionTag`: Exposes CRUD operations for the **ReflectionTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReflectionTags
    * const reflectionTags = await prisma.reflectionTag.findMany()
    * ```
    */
  get reflectionTag(): Prisma.ReflectionTagDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Reflection: 'Reflection',
    Tag: 'Tag',
    ReflectionTag: 'ReflectionTag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "reflection" | "tag" | "reflectionTag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Reflection: {
        payload: Prisma.$ReflectionPayload<ExtArgs>
        fields: Prisma.ReflectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReflectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReflectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload>
          }
          findFirst: {
            args: Prisma.ReflectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReflectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload>
          }
          findMany: {
            args: Prisma.ReflectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload>[]
          }
          create: {
            args: Prisma.ReflectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload>
          }
          createMany: {
            args: Prisma.ReflectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReflectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload>[]
          }
          delete: {
            args: Prisma.ReflectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload>
          }
          update: {
            args: Prisma.ReflectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload>
          }
          deleteMany: {
            args: Prisma.ReflectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReflectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReflectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload>[]
          }
          upsert: {
            args: Prisma.ReflectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionPayload>
          }
          aggregate: {
            args: Prisma.ReflectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReflection>
          }
          groupBy: {
            args: Prisma.ReflectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReflectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReflectionCountArgs<ExtArgs>
            result: $Utils.Optional<ReflectionCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      ReflectionTag: {
        payload: Prisma.$ReflectionTagPayload<ExtArgs>
        fields: Prisma.ReflectionTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReflectionTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReflectionTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload>
          }
          findFirst: {
            args: Prisma.ReflectionTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReflectionTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload>
          }
          findMany: {
            args: Prisma.ReflectionTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload>[]
          }
          create: {
            args: Prisma.ReflectionTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload>
          }
          createMany: {
            args: Prisma.ReflectionTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReflectionTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload>[]
          }
          delete: {
            args: Prisma.ReflectionTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload>
          }
          update: {
            args: Prisma.ReflectionTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload>
          }
          deleteMany: {
            args: Prisma.ReflectionTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReflectionTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReflectionTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload>[]
          }
          upsert: {
            args: Prisma.ReflectionTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReflectionTagPayload>
          }
          aggregate: {
            args: Prisma.ReflectionTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReflectionTag>
          }
          groupBy: {
            args: Prisma.ReflectionTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReflectionTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReflectionTagCountArgs<ExtArgs>
            result: $Utils.Optional<ReflectionTagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    reflection?: ReflectionOmit
    tag?: TagOmit
    reflectionTag?: ReflectionTagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    reflections: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reflections?: boolean | UserCountOutputTypeCountReflectionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReflectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReflectionWhereInput
  }


  /**
   * Count Type ReflectionCountOutputType
   */

  export type ReflectionCountOutputType = {
    tags: number
  }

  export type ReflectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | ReflectionCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * ReflectionCountOutputType without action
   */
  export type ReflectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionCountOutputType
     */
    select?: ReflectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReflectionCountOutputType without action
   */
  export type ReflectionCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReflectionTagWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    reflections: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reflections?: boolean | TagCountOutputTypeCountReflectionsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountReflectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReflectionTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reflections?: boolean | User$reflectionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reflections?: boolean | User$reflectionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      reflections: Prisma.$ReflectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reflections<T extends User$reflectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$reflectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.reflections
   */
  export type User$reflectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    where?: ReflectionWhereInput
    orderBy?: ReflectionOrderByWithRelationInput | ReflectionOrderByWithRelationInput[]
    cursor?: ReflectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReflectionScalarFieldEnum | ReflectionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Reflection
   */

  export type AggregateReflection = {
    _count: ReflectionCountAggregateOutputType | null
    _min: ReflectionMinAggregateOutputType | null
    _max: ReflectionMaxAggregateOutputType | null
  }

  export type ReflectionMinAggregateOutputType = {
    id: string | null
    date: Date | null
    mood: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ReflectionMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    mood: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ReflectionCountAggregateOutputType = {
    id: number
    date: number
    mood: number
    content: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type ReflectionMinAggregateInputType = {
    id?: true
    date?: true
    mood?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ReflectionMaxAggregateInputType = {
    id?: true
    date?: true
    mood?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ReflectionCountAggregateInputType = {
    id?: true
    date?: true
    mood?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type ReflectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reflection to aggregate.
     */
    where?: ReflectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reflections to fetch.
     */
    orderBy?: ReflectionOrderByWithRelationInput | ReflectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReflectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reflections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reflections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reflections
    **/
    _count?: true | ReflectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReflectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReflectionMaxAggregateInputType
  }

  export type GetReflectionAggregateType<T extends ReflectionAggregateArgs> = {
        [P in keyof T & keyof AggregateReflection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReflection[P]>
      : GetScalarType<T[P], AggregateReflection[P]>
  }




  export type ReflectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReflectionWhereInput
    orderBy?: ReflectionOrderByWithAggregationInput | ReflectionOrderByWithAggregationInput[]
    by: ReflectionScalarFieldEnum[] | ReflectionScalarFieldEnum
    having?: ReflectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReflectionCountAggregateInputType | true
    _min?: ReflectionMinAggregateInputType
    _max?: ReflectionMaxAggregateInputType
  }

  export type ReflectionGroupByOutputType = {
    id: string
    date: Date
    mood: string
    content: string
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: ReflectionCountAggregateOutputType | null
    _min: ReflectionMinAggregateOutputType | null
    _max: ReflectionMaxAggregateOutputType | null
  }

  type GetReflectionGroupByPayload<T extends ReflectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReflectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReflectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReflectionGroupByOutputType[P]>
            : GetScalarType<T[P], ReflectionGroupByOutputType[P]>
        }
      >
    >


  export type ReflectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    mood?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | Reflection$tagsArgs<ExtArgs>
    _count?: boolean | ReflectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reflection"]>

  export type ReflectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    mood?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reflection"]>

  export type ReflectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    mood?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reflection"]>

  export type ReflectionSelectScalar = {
    id?: boolean
    date?: boolean
    mood?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type ReflectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "mood" | "content" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["reflection"]>
  export type ReflectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | Reflection$tagsArgs<ExtArgs>
    _count?: boolean | ReflectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReflectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReflectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReflectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reflection"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tags: Prisma.$ReflectionTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      mood: string
      content: string
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["reflection"]>
    composites: {}
  }

  type ReflectionGetPayload<S extends boolean | null | undefined | ReflectionDefaultArgs> = $Result.GetResult<Prisma.$ReflectionPayload, S>

  type ReflectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReflectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReflectionCountAggregateInputType | true
    }

  export interface ReflectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reflection'], meta: { name: 'Reflection' } }
    /**
     * Find zero or one Reflection that matches the filter.
     * @param {ReflectionFindUniqueArgs} args - Arguments to find a Reflection
     * @example
     * // Get one Reflection
     * const reflection = await prisma.reflection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReflectionFindUniqueArgs>(args: SelectSubset<T, ReflectionFindUniqueArgs<ExtArgs>>): Prisma__ReflectionClient<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reflection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReflectionFindUniqueOrThrowArgs} args - Arguments to find a Reflection
     * @example
     * // Get one Reflection
     * const reflection = await prisma.reflection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReflectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ReflectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReflectionClient<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reflection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionFindFirstArgs} args - Arguments to find a Reflection
     * @example
     * // Get one Reflection
     * const reflection = await prisma.reflection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReflectionFindFirstArgs>(args?: SelectSubset<T, ReflectionFindFirstArgs<ExtArgs>>): Prisma__ReflectionClient<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reflection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionFindFirstOrThrowArgs} args - Arguments to find a Reflection
     * @example
     * // Get one Reflection
     * const reflection = await prisma.reflection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReflectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ReflectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReflectionClient<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reflections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reflections
     * const reflections = await prisma.reflection.findMany()
     * 
     * // Get first 10 Reflections
     * const reflections = await prisma.reflection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reflectionWithIdOnly = await prisma.reflection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReflectionFindManyArgs>(args?: SelectSubset<T, ReflectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reflection.
     * @param {ReflectionCreateArgs} args - Arguments to create a Reflection.
     * @example
     * // Create one Reflection
     * const Reflection = await prisma.reflection.create({
     *   data: {
     *     // ... data to create a Reflection
     *   }
     * })
     * 
     */
    create<T extends ReflectionCreateArgs>(args: SelectSubset<T, ReflectionCreateArgs<ExtArgs>>): Prisma__ReflectionClient<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reflections.
     * @param {ReflectionCreateManyArgs} args - Arguments to create many Reflections.
     * @example
     * // Create many Reflections
     * const reflection = await prisma.reflection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReflectionCreateManyArgs>(args?: SelectSubset<T, ReflectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reflections and returns the data saved in the database.
     * @param {ReflectionCreateManyAndReturnArgs} args - Arguments to create many Reflections.
     * @example
     * // Create many Reflections
     * const reflection = await prisma.reflection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reflections and only return the `id`
     * const reflectionWithIdOnly = await prisma.reflection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReflectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ReflectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reflection.
     * @param {ReflectionDeleteArgs} args - Arguments to delete one Reflection.
     * @example
     * // Delete one Reflection
     * const Reflection = await prisma.reflection.delete({
     *   where: {
     *     // ... filter to delete one Reflection
     *   }
     * })
     * 
     */
    delete<T extends ReflectionDeleteArgs>(args: SelectSubset<T, ReflectionDeleteArgs<ExtArgs>>): Prisma__ReflectionClient<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reflection.
     * @param {ReflectionUpdateArgs} args - Arguments to update one Reflection.
     * @example
     * // Update one Reflection
     * const reflection = await prisma.reflection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReflectionUpdateArgs>(args: SelectSubset<T, ReflectionUpdateArgs<ExtArgs>>): Prisma__ReflectionClient<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reflections.
     * @param {ReflectionDeleteManyArgs} args - Arguments to filter Reflections to delete.
     * @example
     * // Delete a few Reflections
     * const { count } = await prisma.reflection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReflectionDeleteManyArgs>(args?: SelectSubset<T, ReflectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reflections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reflections
     * const reflection = await prisma.reflection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReflectionUpdateManyArgs>(args: SelectSubset<T, ReflectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reflections and returns the data updated in the database.
     * @param {ReflectionUpdateManyAndReturnArgs} args - Arguments to update many Reflections.
     * @example
     * // Update many Reflections
     * const reflection = await prisma.reflection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reflections and only return the `id`
     * const reflectionWithIdOnly = await prisma.reflection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReflectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ReflectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reflection.
     * @param {ReflectionUpsertArgs} args - Arguments to update or create a Reflection.
     * @example
     * // Update or create a Reflection
     * const reflection = await prisma.reflection.upsert({
     *   create: {
     *     // ... data to create a Reflection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reflection we want to update
     *   }
     * })
     */
    upsert<T extends ReflectionUpsertArgs>(args: SelectSubset<T, ReflectionUpsertArgs<ExtArgs>>): Prisma__ReflectionClient<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reflections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionCountArgs} args - Arguments to filter Reflections to count.
     * @example
     * // Count the number of Reflections
     * const count = await prisma.reflection.count({
     *   where: {
     *     // ... the filter for the Reflections we want to count
     *   }
     * })
    **/
    count<T extends ReflectionCountArgs>(
      args?: Subset<T, ReflectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReflectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reflection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReflectionAggregateArgs>(args: Subset<T, ReflectionAggregateArgs>): Prisma.PrismaPromise<GetReflectionAggregateType<T>>

    /**
     * Group by Reflection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReflectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReflectionGroupByArgs['orderBy'] }
        : { orderBy?: ReflectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReflectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReflectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reflection model
   */
  readonly fields: ReflectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reflection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReflectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends Reflection$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Reflection$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reflection model
   */
  interface ReflectionFieldRefs {
    readonly id: FieldRef<"Reflection", 'String'>
    readonly date: FieldRef<"Reflection", 'DateTime'>
    readonly mood: FieldRef<"Reflection", 'String'>
    readonly content: FieldRef<"Reflection", 'String'>
    readonly createdAt: FieldRef<"Reflection", 'DateTime'>
    readonly updatedAt: FieldRef<"Reflection", 'DateTime'>
    readonly userId: FieldRef<"Reflection", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Reflection findUnique
   */
  export type ReflectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    /**
     * Filter, which Reflection to fetch.
     */
    where: ReflectionWhereUniqueInput
  }

  /**
   * Reflection findUniqueOrThrow
   */
  export type ReflectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    /**
     * Filter, which Reflection to fetch.
     */
    where: ReflectionWhereUniqueInput
  }

  /**
   * Reflection findFirst
   */
  export type ReflectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    /**
     * Filter, which Reflection to fetch.
     */
    where?: ReflectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reflections to fetch.
     */
    orderBy?: ReflectionOrderByWithRelationInput | ReflectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reflections.
     */
    cursor?: ReflectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reflections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reflections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reflections.
     */
    distinct?: ReflectionScalarFieldEnum | ReflectionScalarFieldEnum[]
  }

  /**
   * Reflection findFirstOrThrow
   */
  export type ReflectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    /**
     * Filter, which Reflection to fetch.
     */
    where?: ReflectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reflections to fetch.
     */
    orderBy?: ReflectionOrderByWithRelationInput | ReflectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reflections.
     */
    cursor?: ReflectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reflections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reflections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reflections.
     */
    distinct?: ReflectionScalarFieldEnum | ReflectionScalarFieldEnum[]
  }

  /**
   * Reflection findMany
   */
  export type ReflectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    /**
     * Filter, which Reflections to fetch.
     */
    where?: ReflectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reflections to fetch.
     */
    orderBy?: ReflectionOrderByWithRelationInput | ReflectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reflections.
     */
    cursor?: ReflectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reflections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reflections.
     */
    skip?: number
    distinct?: ReflectionScalarFieldEnum | ReflectionScalarFieldEnum[]
  }

  /**
   * Reflection create
   */
  export type ReflectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Reflection.
     */
    data: XOR<ReflectionCreateInput, ReflectionUncheckedCreateInput>
  }

  /**
   * Reflection createMany
   */
  export type ReflectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reflections.
     */
    data: ReflectionCreateManyInput | ReflectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reflection createManyAndReturn
   */
  export type ReflectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * The data used to create many Reflections.
     */
    data: ReflectionCreateManyInput | ReflectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reflection update
   */
  export type ReflectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Reflection.
     */
    data: XOR<ReflectionUpdateInput, ReflectionUncheckedUpdateInput>
    /**
     * Choose, which Reflection to update.
     */
    where: ReflectionWhereUniqueInput
  }

  /**
   * Reflection updateMany
   */
  export type ReflectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reflections.
     */
    data: XOR<ReflectionUpdateManyMutationInput, ReflectionUncheckedUpdateManyInput>
    /**
     * Filter which Reflections to update
     */
    where?: ReflectionWhereInput
    /**
     * Limit how many Reflections to update.
     */
    limit?: number
  }

  /**
   * Reflection updateManyAndReturn
   */
  export type ReflectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * The data used to update Reflections.
     */
    data: XOR<ReflectionUpdateManyMutationInput, ReflectionUncheckedUpdateManyInput>
    /**
     * Filter which Reflections to update
     */
    where?: ReflectionWhereInput
    /**
     * Limit how many Reflections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reflection upsert
   */
  export type ReflectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Reflection to update in case it exists.
     */
    where: ReflectionWhereUniqueInput
    /**
     * In case the Reflection found by the `where` argument doesn't exist, create a new Reflection with this data.
     */
    create: XOR<ReflectionCreateInput, ReflectionUncheckedCreateInput>
    /**
     * In case the Reflection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReflectionUpdateInput, ReflectionUncheckedUpdateInput>
  }

  /**
   * Reflection delete
   */
  export type ReflectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
    /**
     * Filter which Reflection to delete.
     */
    where: ReflectionWhereUniqueInput
  }

  /**
   * Reflection deleteMany
   */
  export type ReflectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reflections to delete
     */
    where?: ReflectionWhereInput
    /**
     * Limit how many Reflections to delete.
     */
    limit?: number
  }

  /**
   * Reflection.tags
   */
  export type Reflection$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    where?: ReflectionTagWhereInput
    orderBy?: ReflectionTagOrderByWithRelationInput | ReflectionTagOrderByWithRelationInput[]
    cursor?: ReflectionTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReflectionTagScalarFieldEnum | ReflectionTagScalarFieldEnum[]
  }

  /**
   * Reflection without action
   */
  export type ReflectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reflection
     */
    select?: ReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reflection
     */
    omit?: ReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    reflections?: boolean | Tag$reflectionsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reflections?: boolean | Tag$reflectionsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      reflections: Prisma.$ReflectionTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reflections<T extends Tag$reflectionsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$reflectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly createdAt: FieldRef<"Tag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.reflections
   */
  export type Tag$reflectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    where?: ReflectionTagWhereInput
    orderBy?: ReflectionTagOrderByWithRelationInput | ReflectionTagOrderByWithRelationInput[]
    cursor?: ReflectionTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReflectionTagScalarFieldEnum | ReflectionTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model ReflectionTag
   */

  export type AggregateReflectionTag = {
    _count: ReflectionTagCountAggregateOutputType | null
    _min: ReflectionTagMinAggregateOutputType | null
    _max: ReflectionTagMaxAggregateOutputType | null
  }

  export type ReflectionTagMinAggregateOutputType = {
    reflectionId: string | null
    tagId: string | null
    assignedAt: Date | null
  }

  export type ReflectionTagMaxAggregateOutputType = {
    reflectionId: string | null
    tagId: string | null
    assignedAt: Date | null
  }

  export type ReflectionTagCountAggregateOutputType = {
    reflectionId: number
    tagId: number
    assignedAt: number
    _all: number
  }


  export type ReflectionTagMinAggregateInputType = {
    reflectionId?: true
    tagId?: true
    assignedAt?: true
  }

  export type ReflectionTagMaxAggregateInputType = {
    reflectionId?: true
    tagId?: true
    assignedAt?: true
  }

  export type ReflectionTagCountAggregateInputType = {
    reflectionId?: true
    tagId?: true
    assignedAt?: true
    _all?: true
  }

  export type ReflectionTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReflectionTag to aggregate.
     */
    where?: ReflectionTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReflectionTags to fetch.
     */
    orderBy?: ReflectionTagOrderByWithRelationInput | ReflectionTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReflectionTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReflectionTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReflectionTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReflectionTags
    **/
    _count?: true | ReflectionTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReflectionTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReflectionTagMaxAggregateInputType
  }

  export type GetReflectionTagAggregateType<T extends ReflectionTagAggregateArgs> = {
        [P in keyof T & keyof AggregateReflectionTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReflectionTag[P]>
      : GetScalarType<T[P], AggregateReflectionTag[P]>
  }




  export type ReflectionTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReflectionTagWhereInput
    orderBy?: ReflectionTagOrderByWithAggregationInput | ReflectionTagOrderByWithAggregationInput[]
    by: ReflectionTagScalarFieldEnum[] | ReflectionTagScalarFieldEnum
    having?: ReflectionTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReflectionTagCountAggregateInputType | true
    _min?: ReflectionTagMinAggregateInputType
    _max?: ReflectionTagMaxAggregateInputType
  }

  export type ReflectionTagGroupByOutputType = {
    reflectionId: string
    tagId: string
    assignedAt: Date
    _count: ReflectionTagCountAggregateOutputType | null
    _min: ReflectionTagMinAggregateOutputType | null
    _max: ReflectionTagMaxAggregateOutputType | null
  }

  type GetReflectionTagGroupByPayload<T extends ReflectionTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReflectionTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReflectionTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReflectionTagGroupByOutputType[P]>
            : GetScalarType<T[P], ReflectionTagGroupByOutputType[P]>
        }
      >
    >


  export type ReflectionTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reflectionId?: boolean
    tagId?: boolean
    assignedAt?: boolean
    reflection?: boolean | ReflectionDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reflectionTag"]>

  export type ReflectionTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reflectionId?: boolean
    tagId?: boolean
    assignedAt?: boolean
    reflection?: boolean | ReflectionDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reflectionTag"]>

  export type ReflectionTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reflectionId?: boolean
    tagId?: boolean
    assignedAt?: boolean
    reflection?: boolean | ReflectionDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reflectionTag"]>

  export type ReflectionTagSelectScalar = {
    reflectionId?: boolean
    tagId?: boolean
    assignedAt?: boolean
  }

  export type ReflectionTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"reflectionId" | "tagId" | "assignedAt", ExtArgs["result"]["reflectionTag"]>
  export type ReflectionTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reflection?: boolean | ReflectionDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type ReflectionTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reflection?: boolean | ReflectionDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type ReflectionTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reflection?: boolean | ReflectionDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $ReflectionTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReflectionTag"
    objects: {
      reflection: Prisma.$ReflectionPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      reflectionId: string
      tagId: string
      assignedAt: Date
    }, ExtArgs["result"]["reflectionTag"]>
    composites: {}
  }

  type ReflectionTagGetPayload<S extends boolean | null | undefined | ReflectionTagDefaultArgs> = $Result.GetResult<Prisma.$ReflectionTagPayload, S>

  type ReflectionTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReflectionTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReflectionTagCountAggregateInputType | true
    }

  export interface ReflectionTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReflectionTag'], meta: { name: 'ReflectionTag' } }
    /**
     * Find zero or one ReflectionTag that matches the filter.
     * @param {ReflectionTagFindUniqueArgs} args - Arguments to find a ReflectionTag
     * @example
     * // Get one ReflectionTag
     * const reflectionTag = await prisma.reflectionTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReflectionTagFindUniqueArgs>(args: SelectSubset<T, ReflectionTagFindUniqueArgs<ExtArgs>>): Prisma__ReflectionTagClient<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReflectionTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReflectionTagFindUniqueOrThrowArgs} args - Arguments to find a ReflectionTag
     * @example
     * // Get one ReflectionTag
     * const reflectionTag = await prisma.reflectionTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReflectionTagFindUniqueOrThrowArgs>(args: SelectSubset<T, ReflectionTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReflectionTagClient<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReflectionTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionTagFindFirstArgs} args - Arguments to find a ReflectionTag
     * @example
     * // Get one ReflectionTag
     * const reflectionTag = await prisma.reflectionTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReflectionTagFindFirstArgs>(args?: SelectSubset<T, ReflectionTagFindFirstArgs<ExtArgs>>): Prisma__ReflectionTagClient<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReflectionTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionTagFindFirstOrThrowArgs} args - Arguments to find a ReflectionTag
     * @example
     * // Get one ReflectionTag
     * const reflectionTag = await prisma.reflectionTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReflectionTagFindFirstOrThrowArgs>(args?: SelectSubset<T, ReflectionTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReflectionTagClient<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReflectionTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReflectionTags
     * const reflectionTags = await prisma.reflectionTag.findMany()
     * 
     * // Get first 10 ReflectionTags
     * const reflectionTags = await prisma.reflectionTag.findMany({ take: 10 })
     * 
     * // Only select the `reflectionId`
     * const reflectionTagWithReflectionIdOnly = await prisma.reflectionTag.findMany({ select: { reflectionId: true } })
     * 
     */
    findMany<T extends ReflectionTagFindManyArgs>(args?: SelectSubset<T, ReflectionTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReflectionTag.
     * @param {ReflectionTagCreateArgs} args - Arguments to create a ReflectionTag.
     * @example
     * // Create one ReflectionTag
     * const ReflectionTag = await prisma.reflectionTag.create({
     *   data: {
     *     // ... data to create a ReflectionTag
     *   }
     * })
     * 
     */
    create<T extends ReflectionTagCreateArgs>(args: SelectSubset<T, ReflectionTagCreateArgs<ExtArgs>>): Prisma__ReflectionTagClient<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReflectionTags.
     * @param {ReflectionTagCreateManyArgs} args - Arguments to create many ReflectionTags.
     * @example
     * // Create many ReflectionTags
     * const reflectionTag = await prisma.reflectionTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReflectionTagCreateManyArgs>(args?: SelectSubset<T, ReflectionTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReflectionTags and returns the data saved in the database.
     * @param {ReflectionTagCreateManyAndReturnArgs} args - Arguments to create many ReflectionTags.
     * @example
     * // Create many ReflectionTags
     * const reflectionTag = await prisma.reflectionTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReflectionTags and only return the `reflectionId`
     * const reflectionTagWithReflectionIdOnly = await prisma.reflectionTag.createManyAndReturn({
     *   select: { reflectionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReflectionTagCreateManyAndReturnArgs>(args?: SelectSubset<T, ReflectionTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReflectionTag.
     * @param {ReflectionTagDeleteArgs} args - Arguments to delete one ReflectionTag.
     * @example
     * // Delete one ReflectionTag
     * const ReflectionTag = await prisma.reflectionTag.delete({
     *   where: {
     *     // ... filter to delete one ReflectionTag
     *   }
     * })
     * 
     */
    delete<T extends ReflectionTagDeleteArgs>(args: SelectSubset<T, ReflectionTagDeleteArgs<ExtArgs>>): Prisma__ReflectionTagClient<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReflectionTag.
     * @param {ReflectionTagUpdateArgs} args - Arguments to update one ReflectionTag.
     * @example
     * // Update one ReflectionTag
     * const reflectionTag = await prisma.reflectionTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReflectionTagUpdateArgs>(args: SelectSubset<T, ReflectionTagUpdateArgs<ExtArgs>>): Prisma__ReflectionTagClient<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReflectionTags.
     * @param {ReflectionTagDeleteManyArgs} args - Arguments to filter ReflectionTags to delete.
     * @example
     * // Delete a few ReflectionTags
     * const { count } = await prisma.reflectionTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReflectionTagDeleteManyArgs>(args?: SelectSubset<T, ReflectionTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReflectionTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReflectionTags
     * const reflectionTag = await prisma.reflectionTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReflectionTagUpdateManyArgs>(args: SelectSubset<T, ReflectionTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReflectionTags and returns the data updated in the database.
     * @param {ReflectionTagUpdateManyAndReturnArgs} args - Arguments to update many ReflectionTags.
     * @example
     * // Update many ReflectionTags
     * const reflectionTag = await prisma.reflectionTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReflectionTags and only return the `reflectionId`
     * const reflectionTagWithReflectionIdOnly = await prisma.reflectionTag.updateManyAndReturn({
     *   select: { reflectionId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReflectionTagUpdateManyAndReturnArgs>(args: SelectSubset<T, ReflectionTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReflectionTag.
     * @param {ReflectionTagUpsertArgs} args - Arguments to update or create a ReflectionTag.
     * @example
     * // Update or create a ReflectionTag
     * const reflectionTag = await prisma.reflectionTag.upsert({
     *   create: {
     *     // ... data to create a ReflectionTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReflectionTag we want to update
     *   }
     * })
     */
    upsert<T extends ReflectionTagUpsertArgs>(args: SelectSubset<T, ReflectionTagUpsertArgs<ExtArgs>>): Prisma__ReflectionTagClient<$Result.GetResult<Prisma.$ReflectionTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReflectionTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionTagCountArgs} args - Arguments to filter ReflectionTags to count.
     * @example
     * // Count the number of ReflectionTags
     * const count = await prisma.reflectionTag.count({
     *   where: {
     *     // ... the filter for the ReflectionTags we want to count
     *   }
     * })
    **/
    count<T extends ReflectionTagCountArgs>(
      args?: Subset<T, ReflectionTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReflectionTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReflectionTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReflectionTagAggregateArgs>(args: Subset<T, ReflectionTagAggregateArgs>): Prisma.PrismaPromise<GetReflectionTagAggregateType<T>>

    /**
     * Group by ReflectionTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReflectionTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReflectionTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReflectionTagGroupByArgs['orderBy'] }
        : { orderBy?: ReflectionTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReflectionTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReflectionTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReflectionTag model
   */
  readonly fields: ReflectionTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReflectionTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReflectionTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reflection<T extends ReflectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReflectionDefaultArgs<ExtArgs>>): Prisma__ReflectionClient<$Result.GetResult<Prisma.$ReflectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReflectionTag model
   */
  interface ReflectionTagFieldRefs {
    readonly reflectionId: FieldRef<"ReflectionTag", 'String'>
    readonly tagId: FieldRef<"ReflectionTag", 'String'>
    readonly assignedAt: FieldRef<"ReflectionTag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReflectionTag findUnique
   */
  export type ReflectionTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    /**
     * Filter, which ReflectionTag to fetch.
     */
    where: ReflectionTagWhereUniqueInput
  }

  /**
   * ReflectionTag findUniqueOrThrow
   */
  export type ReflectionTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    /**
     * Filter, which ReflectionTag to fetch.
     */
    where: ReflectionTagWhereUniqueInput
  }

  /**
   * ReflectionTag findFirst
   */
  export type ReflectionTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    /**
     * Filter, which ReflectionTag to fetch.
     */
    where?: ReflectionTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReflectionTags to fetch.
     */
    orderBy?: ReflectionTagOrderByWithRelationInput | ReflectionTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReflectionTags.
     */
    cursor?: ReflectionTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReflectionTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReflectionTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReflectionTags.
     */
    distinct?: ReflectionTagScalarFieldEnum | ReflectionTagScalarFieldEnum[]
  }

  /**
   * ReflectionTag findFirstOrThrow
   */
  export type ReflectionTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    /**
     * Filter, which ReflectionTag to fetch.
     */
    where?: ReflectionTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReflectionTags to fetch.
     */
    orderBy?: ReflectionTagOrderByWithRelationInput | ReflectionTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReflectionTags.
     */
    cursor?: ReflectionTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReflectionTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReflectionTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReflectionTags.
     */
    distinct?: ReflectionTagScalarFieldEnum | ReflectionTagScalarFieldEnum[]
  }

  /**
   * ReflectionTag findMany
   */
  export type ReflectionTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    /**
     * Filter, which ReflectionTags to fetch.
     */
    where?: ReflectionTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReflectionTags to fetch.
     */
    orderBy?: ReflectionTagOrderByWithRelationInput | ReflectionTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReflectionTags.
     */
    cursor?: ReflectionTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReflectionTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReflectionTags.
     */
    skip?: number
    distinct?: ReflectionTagScalarFieldEnum | ReflectionTagScalarFieldEnum[]
  }

  /**
   * ReflectionTag create
   */
  export type ReflectionTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    /**
     * The data needed to create a ReflectionTag.
     */
    data: XOR<ReflectionTagCreateInput, ReflectionTagUncheckedCreateInput>
  }

  /**
   * ReflectionTag createMany
   */
  export type ReflectionTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReflectionTags.
     */
    data: ReflectionTagCreateManyInput | ReflectionTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReflectionTag createManyAndReturn
   */
  export type ReflectionTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * The data used to create many ReflectionTags.
     */
    data: ReflectionTagCreateManyInput | ReflectionTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReflectionTag update
   */
  export type ReflectionTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    /**
     * The data needed to update a ReflectionTag.
     */
    data: XOR<ReflectionTagUpdateInput, ReflectionTagUncheckedUpdateInput>
    /**
     * Choose, which ReflectionTag to update.
     */
    where: ReflectionTagWhereUniqueInput
  }

  /**
   * ReflectionTag updateMany
   */
  export type ReflectionTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReflectionTags.
     */
    data: XOR<ReflectionTagUpdateManyMutationInput, ReflectionTagUncheckedUpdateManyInput>
    /**
     * Filter which ReflectionTags to update
     */
    where?: ReflectionTagWhereInput
    /**
     * Limit how many ReflectionTags to update.
     */
    limit?: number
  }

  /**
   * ReflectionTag updateManyAndReturn
   */
  export type ReflectionTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * The data used to update ReflectionTags.
     */
    data: XOR<ReflectionTagUpdateManyMutationInput, ReflectionTagUncheckedUpdateManyInput>
    /**
     * Filter which ReflectionTags to update
     */
    where?: ReflectionTagWhereInput
    /**
     * Limit how many ReflectionTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReflectionTag upsert
   */
  export type ReflectionTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    /**
     * The filter to search for the ReflectionTag to update in case it exists.
     */
    where: ReflectionTagWhereUniqueInput
    /**
     * In case the ReflectionTag found by the `where` argument doesn't exist, create a new ReflectionTag with this data.
     */
    create: XOR<ReflectionTagCreateInput, ReflectionTagUncheckedCreateInput>
    /**
     * In case the ReflectionTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReflectionTagUpdateInput, ReflectionTagUncheckedUpdateInput>
  }

  /**
   * ReflectionTag delete
   */
  export type ReflectionTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
    /**
     * Filter which ReflectionTag to delete.
     */
    where: ReflectionTagWhereUniqueInput
  }

  /**
   * ReflectionTag deleteMany
   */
  export type ReflectionTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReflectionTags to delete
     */
    where?: ReflectionTagWhereInput
    /**
     * Limit how many ReflectionTags to delete.
     */
    limit?: number
  }

  /**
   * ReflectionTag without action
   */
  export type ReflectionTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReflectionTag
     */
    select?: ReflectionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReflectionTag
     */
    omit?: ReflectionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReflectionTagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ReflectionScalarFieldEnum: {
    id: 'id',
    date: 'date',
    mood: 'mood',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type ReflectionScalarFieldEnum = (typeof ReflectionScalarFieldEnum)[keyof typeof ReflectionScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const ReflectionTagScalarFieldEnum: {
    reflectionId: 'reflectionId',
    tagId: 'tagId',
    assignedAt: 'assignedAt'
  };

  export type ReflectionTagScalarFieldEnum = (typeof ReflectionTagScalarFieldEnum)[keyof typeof ReflectionTagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reflections?: ReflectionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reflections?: ReflectionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reflections?: ReflectionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ReflectionWhereInput = {
    AND?: ReflectionWhereInput | ReflectionWhereInput[]
    OR?: ReflectionWhereInput[]
    NOT?: ReflectionWhereInput | ReflectionWhereInput[]
    id?: StringFilter<"Reflection"> | string
    date?: DateTimeFilter<"Reflection"> | Date | string
    mood?: StringFilter<"Reflection"> | string
    content?: StringFilter<"Reflection"> | string
    createdAt?: DateTimeFilter<"Reflection"> | Date | string
    updatedAt?: DateTimeFilter<"Reflection"> | Date | string
    userId?: StringFilter<"Reflection"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: ReflectionTagListRelationFilter
  }

  export type ReflectionOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    mood?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    tags?: ReflectionTagOrderByRelationAggregateInput
  }

  export type ReflectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReflectionWhereInput | ReflectionWhereInput[]
    OR?: ReflectionWhereInput[]
    NOT?: ReflectionWhereInput | ReflectionWhereInput[]
    date?: DateTimeFilter<"Reflection"> | Date | string
    mood?: StringFilter<"Reflection"> | string
    content?: StringFilter<"Reflection"> | string
    createdAt?: DateTimeFilter<"Reflection"> | Date | string
    updatedAt?: DateTimeFilter<"Reflection"> | Date | string
    userId?: StringFilter<"Reflection"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: ReflectionTagListRelationFilter
  }, "id">

  export type ReflectionOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    mood?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: ReflectionCountOrderByAggregateInput
    _max?: ReflectionMaxOrderByAggregateInput
    _min?: ReflectionMinOrderByAggregateInput
  }

  export type ReflectionScalarWhereWithAggregatesInput = {
    AND?: ReflectionScalarWhereWithAggregatesInput | ReflectionScalarWhereWithAggregatesInput[]
    OR?: ReflectionScalarWhereWithAggregatesInput[]
    NOT?: ReflectionScalarWhereWithAggregatesInput | ReflectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reflection"> | string
    date?: DateTimeWithAggregatesFilter<"Reflection"> | Date | string
    mood?: StringWithAggregatesFilter<"Reflection"> | string
    content?: StringWithAggregatesFilter<"Reflection"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Reflection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Reflection"> | Date | string
    userId?: StringWithAggregatesFilter<"Reflection"> | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    reflections?: ReflectionTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    reflections?: ReflectionTagOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    reflections?: ReflectionTagListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Tag"> | Date | string
  }

  export type ReflectionTagWhereInput = {
    AND?: ReflectionTagWhereInput | ReflectionTagWhereInput[]
    OR?: ReflectionTagWhereInput[]
    NOT?: ReflectionTagWhereInput | ReflectionTagWhereInput[]
    reflectionId?: StringFilter<"ReflectionTag"> | string
    tagId?: StringFilter<"ReflectionTag"> | string
    assignedAt?: DateTimeFilter<"ReflectionTag"> | Date | string
    reflection?: XOR<ReflectionScalarRelationFilter, ReflectionWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type ReflectionTagOrderByWithRelationInput = {
    reflectionId?: SortOrder
    tagId?: SortOrder
    assignedAt?: SortOrder
    reflection?: ReflectionOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type ReflectionTagWhereUniqueInput = Prisma.AtLeast<{
    reflectionId_tagId?: ReflectionTagReflectionIdTagIdCompoundUniqueInput
    AND?: ReflectionTagWhereInput | ReflectionTagWhereInput[]
    OR?: ReflectionTagWhereInput[]
    NOT?: ReflectionTagWhereInput | ReflectionTagWhereInput[]
    reflectionId?: StringFilter<"ReflectionTag"> | string
    tagId?: StringFilter<"ReflectionTag"> | string
    assignedAt?: DateTimeFilter<"ReflectionTag"> | Date | string
    reflection?: XOR<ReflectionScalarRelationFilter, ReflectionWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "reflectionId_tagId">

  export type ReflectionTagOrderByWithAggregationInput = {
    reflectionId?: SortOrder
    tagId?: SortOrder
    assignedAt?: SortOrder
    _count?: ReflectionTagCountOrderByAggregateInput
    _max?: ReflectionTagMaxOrderByAggregateInput
    _min?: ReflectionTagMinOrderByAggregateInput
  }

  export type ReflectionTagScalarWhereWithAggregatesInput = {
    AND?: ReflectionTagScalarWhereWithAggregatesInput | ReflectionTagScalarWhereWithAggregatesInput[]
    OR?: ReflectionTagScalarWhereWithAggregatesInput[]
    NOT?: ReflectionTagScalarWhereWithAggregatesInput | ReflectionTagScalarWhereWithAggregatesInput[]
    reflectionId?: StringWithAggregatesFilter<"ReflectionTag"> | string
    tagId?: StringWithAggregatesFilter<"ReflectionTag"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"ReflectionTag"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reflections?: ReflectionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reflections?: ReflectionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reflections?: ReflectionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reflections?: ReflectionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionCreateInput = {
    id?: string
    date: Date | string
    mood: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReflectionsInput
    tags?: ReflectionTagCreateNestedManyWithoutReflectionInput
  }

  export type ReflectionUncheckedCreateInput = {
    id?: string
    date: Date | string
    mood: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ReflectionTagUncheckedCreateNestedManyWithoutReflectionInput
  }

  export type ReflectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReflectionsNestedInput
    tags?: ReflectionTagUpdateManyWithoutReflectionNestedInput
  }

  export type ReflectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ReflectionTagUncheckedUpdateManyWithoutReflectionNestedInput
  }

  export type ReflectionCreateManyInput = {
    id?: string
    date: Date | string
    mood: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ReflectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    reflections?: ReflectionTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    reflections?: ReflectionTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reflections?: ReflectionTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reflections?: ReflectionTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionTagCreateInput = {
    assignedAt?: Date | string
    reflection: ReflectionCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutReflectionsInput
  }

  export type ReflectionTagUncheckedCreateInput = {
    reflectionId: string
    tagId: string
    assignedAt?: Date | string
  }

  export type ReflectionTagUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reflection?: ReflectionUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutReflectionsNestedInput
  }

  export type ReflectionTagUncheckedUpdateInput = {
    reflectionId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionTagCreateManyInput = {
    reflectionId: string
    tagId: string
    assignedAt?: Date | string
  }

  export type ReflectionTagUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionTagUncheckedUpdateManyInput = {
    reflectionId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ReflectionListRelationFilter = {
    every?: ReflectionWhereInput
    some?: ReflectionWhereInput
    none?: ReflectionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReflectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReflectionTagListRelationFilter = {
    every?: ReflectionTagWhereInput
    some?: ReflectionTagWhereInput
    none?: ReflectionTagWhereInput
  }

  export type ReflectionTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReflectionCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    mood?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ReflectionMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    mood?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ReflectionMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    mood?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ReflectionScalarRelationFilter = {
    is?: ReflectionWhereInput
    isNot?: ReflectionWhereInput
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type ReflectionTagReflectionIdTagIdCompoundUniqueInput = {
    reflectionId: string
    tagId: string
  }

  export type ReflectionTagCountOrderByAggregateInput = {
    reflectionId?: SortOrder
    tagId?: SortOrder
    assignedAt?: SortOrder
  }

  export type ReflectionTagMaxOrderByAggregateInput = {
    reflectionId?: SortOrder
    tagId?: SortOrder
    assignedAt?: SortOrder
  }

  export type ReflectionTagMinOrderByAggregateInput = {
    reflectionId?: SortOrder
    tagId?: SortOrder
    assignedAt?: SortOrder
  }

  export type ReflectionCreateNestedManyWithoutUserInput = {
    create?: XOR<ReflectionCreateWithoutUserInput, ReflectionUncheckedCreateWithoutUserInput> | ReflectionCreateWithoutUserInput[] | ReflectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReflectionCreateOrConnectWithoutUserInput | ReflectionCreateOrConnectWithoutUserInput[]
    createMany?: ReflectionCreateManyUserInputEnvelope
    connect?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
  }

  export type ReflectionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReflectionCreateWithoutUserInput, ReflectionUncheckedCreateWithoutUserInput> | ReflectionCreateWithoutUserInput[] | ReflectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReflectionCreateOrConnectWithoutUserInput | ReflectionCreateOrConnectWithoutUserInput[]
    createMany?: ReflectionCreateManyUserInputEnvelope
    connect?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ReflectionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReflectionCreateWithoutUserInput, ReflectionUncheckedCreateWithoutUserInput> | ReflectionCreateWithoutUserInput[] | ReflectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReflectionCreateOrConnectWithoutUserInput | ReflectionCreateOrConnectWithoutUserInput[]
    upsert?: ReflectionUpsertWithWhereUniqueWithoutUserInput | ReflectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReflectionCreateManyUserInputEnvelope
    set?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
    disconnect?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
    delete?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
    connect?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
    update?: ReflectionUpdateWithWhereUniqueWithoutUserInput | ReflectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReflectionUpdateManyWithWhereWithoutUserInput | ReflectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReflectionScalarWhereInput | ReflectionScalarWhereInput[]
  }

  export type ReflectionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReflectionCreateWithoutUserInput, ReflectionUncheckedCreateWithoutUserInput> | ReflectionCreateWithoutUserInput[] | ReflectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReflectionCreateOrConnectWithoutUserInput | ReflectionCreateOrConnectWithoutUserInput[]
    upsert?: ReflectionUpsertWithWhereUniqueWithoutUserInput | ReflectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReflectionCreateManyUserInputEnvelope
    set?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
    disconnect?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
    delete?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
    connect?: ReflectionWhereUniqueInput | ReflectionWhereUniqueInput[]
    update?: ReflectionUpdateWithWhereUniqueWithoutUserInput | ReflectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReflectionUpdateManyWithWhereWithoutUserInput | ReflectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReflectionScalarWhereInput | ReflectionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutReflectionsInput = {
    create?: XOR<UserCreateWithoutReflectionsInput, UserUncheckedCreateWithoutReflectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReflectionsInput
    connect?: UserWhereUniqueInput
  }

  export type ReflectionTagCreateNestedManyWithoutReflectionInput = {
    create?: XOR<ReflectionTagCreateWithoutReflectionInput, ReflectionTagUncheckedCreateWithoutReflectionInput> | ReflectionTagCreateWithoutReflectionInput[] | ReflectionTagUncheckedCreateWithoutReflectionInput[]
    connectOrCreate?: ReflectionTagCreateOrConnectWithoutReflectionInput | ReflectionTagCreateOrConnectWithoutReflectionInput[]
    createMany?: ReflectionTagCreateManyReflectionInputEnvelope
    connect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
  }

  export type ReflectionTagUncheckedCreateNestedManyWithoutReflectionInput = {
    create?: XOR<ReflectionTagCreateWithoutReflectionInput, ReflectionTagUncheckedCreateWithoutReflectionInput> | ReflectionTagCreateWithoutReflectionInput[] | ReflectionTagUncheckedCreateWithoutReflectionInput[]
    connectOrCreate?: ReflectionTagCreateOrConnectWithoutReflectionInput | ReflectionTagCreateOrConnectWithoutReflectionInput[]
    createMany?: ReflectionTagCreateManyReflectionInputEnvelope
    connect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutReflectionsNestedInput = {
    create?: XOR<UserCreateWithoutReflectionsInput, UserUncheckedCreateWithoutReflectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReflectionsInput
    upsert?: UserUpsertWithoutReflectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReflectionsInput, UserUpdateWithoutReflectionsInput>, UserUncheckedUpdateWithoutReflectionsInput>
  }

  export type ReflectionTagUpdateManyWithoutReflectionNestedInput = {
    create?: XOR<ReflectionTagCreateWithoutReflectionInput, ReflectionTagUncheckedCreateWithoutReflectionInput> | ReflectionTagCreateWithoutReflectionInput[] | ReflectionTagUncheckedCreateWithoutReflectionInput[]
    connectOrCreate?: ReflectionTagCreateOrConnectWithoutReflectionInput | ReflectionTagCreateOrConnectWithoutReflectionInput[]
    upsert?: ReflectionTagUpsertWithWhereUniqueWithoutReflectionInput | ReflectionTagUpsertWithWhereUniqueWithoutReflectionInput[]
    createMany?: ReflectionTagCreateManyReflectionInputEnvelope
    set?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    disconnect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    delete?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    connect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    update?: ReflectionTagUpdateWithWhereUniqueWithoutReflectionInput | ReflectionTagUpdateWithWhereUniqueWithoutReflectionInput[]
    updateMany?: ReflectionTagUpdateManyWithWhereWithoutReflectionInput | ReflectionTagUpdateManyWithWhereWithoutReflectionInput[]
    deleteMany?: ReflectionTagScalarWhereInput | ReflectionTagScalarWhereInput[]
  }

  export type ReflectionTagUncheckedUpdateManyWithoutReflectionNestedInput = {
    create?: XOR<ReflectionTagCreateWithoutReflectionInput, ReflectionTagUncheckedCreateWithoutReflectionInput> | ReflectionTagCreateWithoutReflectionInput[] | ReflectionTagUncheckedCreateWithoutReflectionInput[]
    connectOrCreate?: ReflectionTagCreateOrConnectWithoutReflectionInput | ReflectionTagCreateOrConnectWithoutReflectionInput[]
    upsert?: ReflectionTagUpsertWithWhereUniqueWithoutReflectionInput | ReflectionTagUpsertWithWhereUniqueWithoutReflectionInput[]
    createMany?: ReflectionTagCreateManyReflectionInputEnvelope
    set?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    disconnect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    delete?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    connect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    update?: ReflectionTagUpdateWithWhereUniqueWithoutReflectionInput | ReflectionTagUpdateWithWhereUniqueWithoutReflectionInput[]
    updateMany?: ReflectionTagUpdateManyWithWhereWithoutReflectionInput | ReflectionTagUpdateManyWithWhereWithoutReflectionInput[]
    deleteMany?: ReflectionTagScalarWhereInput | ReflectionTagScalarWhereInput[]
  }

  export type ReflectionTagCreateNestedManyWithoutTagInput = {
    create?: XOR<ReflectionTagCreateWithoutTagInput, ReflectionTagUncheckedCreateWithoutTagInput> | ReflectionTagCreateWithoutTagInput[] | ReflectionTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ReflectionTagCreateOrConnectWithoutTagInput | ReflectionTagCreateOrConnectWithoutTagInput[]
    createMany?: ReflectionTagCreateManyTagInputEnvelope
    connect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
  }

  export type ReflectionTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<ReflectionTagCreateWithoutTagInput, ReflectionTagUncheckedCreateWithoutTagInput> | ReflectionTagCreateWithoutTagInput[] | ReflectionTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ReflectionTagCreateOrConnectWithoutTagInput | ReflectionTagCreateOrConnectWithoutTagInput[]
    createMany?: ReflectionTagCreateManyTagInputEnvelope
    connect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
  }

  export type ReflectionTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<ReflectionTagCreateWithoutTagInput, ReflectionTagUncheckedCreateWithoutTagInput> | ReflectionTagCreateWithoutTagInput[] | ReflectionTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ReflectionTagCreateOrConnectWithoutTagInput | ReflectionTagCreateOrConnectWithoutTagInput[]
    upsert?: ReflectionTagUpsertWithWhereUniqueWithoutTagInput | ReflectionTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ReflectionTagCreateManyTagInputEnvelope
    set?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    disconnect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    delete?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    connect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    update?: ReflectionTagUpdateWithWhereUniqueWithoutTagInput | ReflectionTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ReflectionTagUpdateManyWithWhereWithoutTagInput | ReflectionTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ReflectionTagScalarWhereInput | ReflectionTagScalarWhereInput[]
  }

  export type ReflectionTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<ReflectionTagCreateWithoutTagInput, ReflectionTagUncheckedCreateWithoutTagInput> | ReflectionTagCreateWithoutTagInput[] | ReflectionTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ReflectionTagCreateOrConnectWithoutTagInput | ReflectionTagCreateOrConnectWithoutTagInput[]
    upsert?: ReflectionTagUpsertWithWhereUniqueWithoutTagInput | ReflectionTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ReflectionTagCreateManyTagInputEnvelope
    set?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    disconnect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    delete?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    connect?: ReflectionTagWhereUniqueInput | ReflectionTagWhereUniqueInput[]
    update?: ReflectionTagUpdateWithWhereUniqueWithoutTagInput | ReflectionTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ReflectionTagUpdateManyWithWhereWithoutTagInput | ReflectionTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ReflectionTagScalarWhereInput | ReflectionTagScalarWhereInput[]
  }

  export type ReflectionCreateNestedOneWithoutTagsInput = {
    create?: XOR<ReflectionCreateWithoutTagsInput, ReflectionUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ReflectionCreateOrConnectWithoutTagsInput
    connect?: ReflectionWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutReflectionsInput = {
    create?: XOR<TagCreateWithoutReflectionsInput, TagUncheckedCreateWithoutReflectionsInput>
    connectOrCreate?: TagCreateOrConnectWithoutReflectionsInput
    connect?: TagWhereUniqueInput
  }

  export type ReflectionUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<ReflectionCreateWithoutTagsInput, ReflectionUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ReflectionCreateOrConnectWithoutTagsInput
    upsert?: ReflectionUpsertWithoutTagsInput
    connect?: ReflectionWhereUniqueInput
    update?: XOR<XOR<ReflectionUpdateToOneWithWhereWithoutTagsInput, ReflectionUpdateWithoutTagsInput>, ReflectionUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutReflectionsNestedInput = {
    create?: XOR<TagCreateWithoutReflectionsInput, TagUncheckedCreateWithoutReflectionsInput>
    connectOrCreate?: TagCreateOrConnectWithoutReflectionsInput
    upsert?: TagUpsertWithoutReflectionsInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutReflectionsInput, TagUpdateWithoutReflectionsInput>, TagUncheckedUpdateWithoutReflectionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ReflectionCreateWithoutUserInput = {
    id?: string
    date: Date | string
    mood: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ReflectionTagCreateNestedManyWithoutReflectionInput
  }

  export type ReflectionUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    mood: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ReflectionTagUncheckedCreateNestedManyWithoutReflectionInput
  }

  export type ReflectionCreateOrConnectWithoutUserInput = {
    where: ReflectionWhereUniqueInput
    create: XOR<ReflectionCreateWithoutUserInput, ReflectionUncheckedCreateWithoutUserInput>
  }

  export type ReflectionCreateManyUserInputEnvelope = {
    data: ReflectionCreateManyUserInput | ReflectionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReflectionUpsertWithWhereUniqueWithoutUserInput = {
    where: ReflectionWhereUniqueInput
    update: XOR<ReflectionUpdateWithoutUserInput, ReflectionUncheckedUpdateWithoutUserInput>
    create: XOR<ReflectionCreateWithoutUserInput, ReflectionUncheckedCreateWithoutUserInput>
  }

  export type ReflectionUpdateWithWhereUniqueWithoutUserInput = {
    where: ReflectionWhereUniqueInput
    data: XOR<ReflectionUpdateWithoutUserInput, ReflectionUncheckedUpdateWithoutUserInput>
  }

  export type ReflectionUpdateManyWithWhereWithoutUserInput = {
    where: ReflectionScalarWhereInput
    data: XOR<ReflectionUpdateManyMutationInput, ReflectionUncheckedUpdateManyWithoutUserInput>
  }

  export type ReflectionScalarWhereInput = {
    AND?: ReflectionScalarWhereInput | ReflectionScalarWhereInput[]
    OR?: ReflectionScalarWhereInput[]
    NOT?: ReflectionScalarWhereInput | ReflectionScalarWhereInput[]
    id?: StringFilter<"Reflection"> | string
    date?: DateTimeFilter<"Reflection"> | Date | string
    mood?: StringFilter<"Reflection"> | string
    content?: StringFilter<"Reflection"> | string
    createdAt?: DateTimeFilter<"Reflection"> | Date | string
    updatedAt?: DateTimeFilter<"Reflection"> | Date | string
    userId?: StringFilter<"Reflection"> | string
  }

  export type UserCreateWithoutReflectionsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutReflectionsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutReflectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReflectionsInput, UserUncheckedCreateWithoutReflectionsInput>
  }

  export type ReflectionTagCreateWithoutReflectionInput = {
    assignedAt?: Date | string
    tag: TagCreateNestedOneWithoutReflectionsInput
  }

  export type ReflectionTagUncheckedCreateWithoutReflectionInput = {
    tagId: string
    assignedAt?: Date | string
  }

  export type ReflectionTagCreateOrConnectWithoutReflectionInput = {
    where: ReflectionTagWhereUniqueInput
    create: XOR<ReflectionTagCreateWithoutReflectionInput, ReflectionTagUncheckedCreateWithoutReflectionInput>
  }

  export type ReflectionTagCreateManyReflectionInputEnvelope = {
    data: ReflectionTagCreateManyReflectionInput | ReflectionTagCreateManyReflectionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutReflectionsInput = {
    update: XOR<UserUpdateWithoutReflectionsInput, UserUncheckedUpdateWithoutReflectionsInput>
    create: XOR<UserCreateWithoutReflectionsInput, UserUncheckedCreateWithoutReflectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReflectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReflectionsInput, UserUncheckedUpdateWithoutReflectionsInput>
  }

  export type UserUpdateWithoutReflectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutReflectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionTagUpsertWithWhereUniqueWithoutReflectionInput = {
    where: ReflectionTagWhereUniqueInput
    update: XOR<ReflectionTagUpdateWithoutReflectionInput, ReflectionTagUncheckedUpdateWithoutReflectionInput>
    create: XOR<ReflectionTagCreateWithoutReflectionInput, ReflectionTagUncheckedCreateWithoutReflectionInput>
  }

  export type ReflectionTagUpdateWithWhereUniqueWithoutReflectionInput = {
    where: ReflectionTagWhereUniqueInput
    data: XOR<ReflectionTagUpdateWithoutReflectionInput, ReflectionTagUncheckedUpdateWithoutReflectionInput>
  }

  export type ReflectionTagUpdateManyWithWhereWithoutReflectionInput = {
    where: ReflectionTagScalarWhereInput
    data: XOR<ReflectionTagUpdateManyMutationInput, ReflectionTagUncheckedUpdateManyWithoutReflectionInput>
  }

  export type ReflectionTagScalarWhereInput = {
    AND?: ReflectionTagScalarWhereInput | ReflectionTagScalarWhereInput[]
    OR?: ReflectionTagScalarWhereInput[]
    NOT?: ReflectionTagScalarWhereInput | ReflectionTagScalarWhereInput[]
    reflectionId?: StringFilter<"ReflectionTag"> | string
    tagId?: StringFilter<"ReflectionTag"> | string
    assignedAt?: DateTimeFilter<"ReflectionTag"> | Date | string
  }

  export type ReflectionTagCreateWithoutTagInput = {
    assignedAt?: Date | string
    reflection: ReflectionCreateNestedOneWithoutTagsInput
  }

  export type ReflectionTagUncheckedCreateWithoutTagInput = {
    reflectionId: string
    assignedAt?: Date | string
  }

  export type ReflectionTagCreateOrConnectWithoutTagInput = {
    where: ReflectionTagWhereUniqueInput
    create: XOR<ReflectionTagCreateWithoutTagInput, ReflectionTagUncheckedCreateWithoutTagInput>
  }

  export type ReflectionTagCreateManyTagInputEnvelope = {
    data: ReflectionTagCreateManyTagInput | ReflectionTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type ReflectionTagUpsertWithWhereUniqueWithoutTagInput = {
    where: ReflectionTagWhereUniqueInput
    update: XOR<ReflectionTagUpdateWithoutTagInput, ReflectionTagUncheckedUpdateWithoutTagInput>
    create: XOR<ReflectionTagCreateWithoutTagInput, ReflectionTagUncheckedCreateWithoutTagInput>
  }

  export type ReflectionTagUpdateWithWhereUniqueWithoutTagInput = {
    where: ReflectionTagWhereUniqueInput
    data: XOR<ReflectionTagUpdateWithoutTagInput, ReflectionTagUncheckedUpdateWithoutTagInput>
  }

  export type ReflectionTagUpdateManyWithWhereWithoutTagInput = {
    where: ReflectionTagScalarWhereInput
    data: XOR<ReflectionTagUpdateManyMutationInput, ReflectionTagUncheckedUpdateManyWithoutTagInput>
  }

  export type ReflectionCreateWithoutTagsInput = {
    id?: string
    date: Date | string
    mood: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReflectionsInput
  }

  export type ReflectionUncheckedCreateWithoutTagsInput = {
    id?: string
    date: Date | string
    mood: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ReflectionCreateOrConnectWithoutTagsInput = {
    where: ReflectionWhereUniqueInput
    create: XOR<ReflectionCreateWithoutTagsInput, ReflectionUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutReflectionsInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type TagUncheckedCreateWithoutReflectionsInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type TagCreateOrConnectWithoutReflectionsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutReflectionsInput, TagUncheckedCreateWithoutReflectionsInput>
  }

  export type ReflectionUpsertWithoutTagsInput = {
    update: XOR<ReflectionUpdateWithoutTagsInput, ReflectionUncheckedUpdateWithoutTagsInput>
    create: XOR<ReflectionCreateWithoutTagsInput, ReflectionUncheckedCreateWithoutTagsInput>
    where?: ReflectionWhereInput
  }

  export type ReflectionUpdateToOneWithWhereWithoutTagsInput = {
    where?: ReflectionWhereInput
    data: XOR<ReflectionUpdateWithoutTagsInput, ReflectionUncheckedUpdateWithoutTagsInput>
  }

  export type ReflectionUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReflectionsNestedInput
  }

  export type ReflectionUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TagUpsertWithoutReflectionsInput = {
    update: XOR<TagUpdateWithoutReflectionsInput, TagUncheckedUpdateWithoutReflectionsInput>
    create: XOR<TagCreateWithoutReflectionsInput, TagUncheckedCreateWithoutReflectionsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutReflectionsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutReflectionsInput, TagUncheckedUpdateWithoutReflectionsInput>
  }

  export type TagUpdateWithoutReflectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateWithoutReflectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionCreateManyUserInput = {
    id?: string
    date: Date | string
    mood: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReflectionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ReflectionTagUpdateManyWithoutReflectionNestedInput
  }

  export type ReflectionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ReflectionTagUncheckedUpdateManyWithoutReflectionNestedInput
  }

  export type ReflectionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionTagCreateManyReflectionInput = {
    tagId: string
    assignedAt?: Date | string
  }

  export type ReflectionTagUpdateWithoutReflectionInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tag?: TagUpdateOneRequiredWithoutReflectionsNestedInput
  }

  export type ReflectionTagUncheckedUpdateWithoutReflectionInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionTagUncheckedUpdateManyWithoutReflectionInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionTagCreateManyTagInput = {
    reflectionId: string
    assignedAt?: Date | string
  }

  export type ReflectionTagUpdateWithoutTagInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reflection?: ReflectionUpdateOneRequiredWithoutTagsNestedInput
  }

  export type ReflectionTagUncheckedUpdateWithoutTagInput = {
    reflectionId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReflectionTagUncheckedUpdateManyWithoutTagInput = {
    reflectionId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}