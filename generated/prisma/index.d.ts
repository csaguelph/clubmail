
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
 * Model Club
 * 
 */
export type Club = $Result.DefaultSelection<Prisma.$ClubPayload>
/**
 * Model ClubMember
 * 
 */
export type ClubMember = $Result.DefaultSelection<Prisma.$ClubMemberPayload>
/**
 * Model ClubSettings
 * 
 */
export type ClubSettings = $Result.DefaultSelection<Prisma.$ClubSettingsPayload>
/**
 * Model EmailList
 * 
 */
export type EmailList = $Result.DefaultSelection<Prisma.$EmailListPayload>
/**
 * Model Subscriber
 * 
 */
export type Subscriber = $Result.DefaultSelection<Prisma.$SubscriberPayload>
/**
 * Model SubscriberListMembership
 * 
 */
export type SubscriberListMembership = $Result.DefaultSelection<Prisma.$SubscriberListMembershipPayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>
/**
 * Model EmailEvent
 * 
 */
export type EmailEvent = $Result.DefaultSelection<Prisma.$EmailEventPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ClubRole: {
  CLUB_OWNER: 'CLUB_OWNER',
  CLUB_EDITOR: 'CLUB_EDITOR',
  CLUB_VIEWER: 'CLUB_VIEWER'
};

export type ClubRole = (typeof ClubRole)[keyof typeof ClubRole]


export const SubscriberStatus: {
  SUBSCRIBED: 'SUBSCRIBED',
  UNSUBSCRIBED: 'UNSUBSCRIBED',
  BOUNCED: 'BOUNCED'
};

export type SubscriberStatus = (typeof SubscriberStatus)[keyof typeof SubscriberStatus]


export const CampaignStatus: {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  SENDING: 'SENDING',
  SENT: 'SENT',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus]


export const EmailEventStatus: {
  QUEUED: 'QUEUED',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  BOUNCED: 'BOUNCED',
  COMPLAINED: 'COMPLAINED',
  FAILED: 'FAILED'
};

export type EmailEventStatus = (typeof EmailEventStatus)[keyof typeof EmailEventStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ClubRole = $Enums.ClubRole

export const ClubRole: typeof $Enums.ClubRole

export type SubscriberStatus = $Enums.SubscriberStatus

export const SubscriberStatus: typeof $Enums.SubscriberStatus

export type CampaignStatus = $Enums.CampaignStatus

export const CampaignStatus: typeof $Enums.CampaignStatus

export type EmailEventStatus = $Enums.EmailEventStatus

export const EmailEventStatus: typeof $Enums.EmailEventStatus

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
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * `prisma.club`: Exposes CRUD operations for the **Club** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clubs
    * const clubs = await prisma.club.findMany()
    * ```
    */
  get club(): Prisma.ClubDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clubMember`: Exposes CRUD operations for the **ClubMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClubMembers
    * const clubMembers = await prisma.clubMember.findMany()
    * ```
    */
  get clubMember(): Prisma.ClubMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clubSettings`: Exposes CRUD operations for the **ClubSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClubSettings
    * const clubSettings = await prisma.clubSettings.findMany()
    * ```
    */
  get clubSettings(): Prisma.ClubSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailList`: Exposes CRUD operations for the **EmailList** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailLists
    * const emailLists = await prisma.emailList.findMany()
    * ```
    */
  get emailList(): Prisma.EmailListDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriber`: Exposes CRUD operations for the **Subscriber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscribers
    * const subscribers = await prisma.subscriber.findMany()
    * ```
    */
  get subscriber(): Prisma.SubscriberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriberListMembership`: Exposes CRUD operations for the **SubscriberListMembership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscriberListMemberships
    * const subscriberListMemberships = await prisma.subscriberListMembership.findMany()
    * ```
    */
  get subscriberListMembership(): Prisma.SubscriberListMembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailEvent`: Exposes CRUD operations for the **EmailEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailEvents
    * const emailEvents = await prisma.emailEvent.findMany()
    * ```
    */
  get emailEvent(): Prisma.EmailEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Club: 'Club',
    ClubMember: 'ClubMember',
    ClubSettings: 'ClubSettings',
    EmailList: 'EmailList',
    Subscriber: 'Subscriber',
    SubscriberListMembership: 'SubscriberListMembership',
    Campaign: 'Campaign',
    EmailEvent: 'EmailEvent',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification'
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
      modelProps: "user" | "club" | "clubMember" | "clubSettings" | "emailList" | "subscriber" | "subscriberListMembership" | "campaign" | "emailEvent" | "session" | "account" | "verification"
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
      Club: {
        payload: Prisma.$ClubPayload<ExtArgs>
        fields: Prisma.ClubFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClubFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClubFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          findFirst: {
            args: Prisma.ClubFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClubFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          findMany: {
            args: Prisma.ClubFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[]
          }
          create: {
            args: Prisma.ClubCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          createMany: {
            args: Prisma.ClubCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClubCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[]
          }
          delete: {
            args: Prisma.ClubDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          update: {
            args: Prisma.ClubUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          deleteMany: {
            args: Prisma.ClubDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClubUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClubUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[]
          }
          upsert: {
            args: Prisma.ClubUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          aggregate: {
            args: Prisma.ClubAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClub>
          }
          groupBy: {
            args: Prisma.ClubGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClubGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClubCountArgs<ExtArgs>
            result: $Utils.Optional<ClubCountAggregateOutputType> | number
          }
        }
      }
      ClubMember: {
        payload: Prisma.$ClubMemberPayload<ExtArgs>
        fields: Prisma.ClubMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClubMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClubMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload>
          }
          findFirst: {
            args: Prisma.ClubMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClubMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload>
          }
          findMany: {
            args: Prisma.ClubMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload>[]
          }
          create: {
            args: Prisma.ClubMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload>
          }
          createMany: {
            args: Prisma.ClubMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClubMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload>[]
          }
          delete: {
            args: Prisma.ClubMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload>
          }
          update: {
            args: Prisma.ClubMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload>
          }
          deleteMany: {
            args: Prisma.ClubMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClubMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClubMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload>[]
          }
          upsert: {
            args: Prisma.ClubMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMemberPayload>
          }
          aggregate: {
            args: Prisma.ClubMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClubMember>
          }
          groupBy: {
            args: Prisma.ClubMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClubMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClubMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ClubMemberCountAggregateOutputType> | number
          }
        }
      }
      ClubSettings: {
        payload: Prisma.$ClubSettingsPayload<ExtArgs>
        fields: Prisma.ClubSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClubSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClubSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload>
          }
          findFirst: {
            args: Prisma.ClubSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClubSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload>
          }
          findMany: {
            args: Prisma.ClubSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload>[]
          }
          create: {
            args: Prisma.ClubSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload>
          }
          createMany: {
            args: Prisma.ClubSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClubSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload>[]
          }
          delete: {
            args: Prisma.ClubSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload>
          }
          update: {
            args: Prisma.ClubSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload>
          }
          deleteMany: {
            args: Prisma.ClubSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClubSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClubSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload>[]
          }
          upsert: {
            args: Prisma.ClubSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubSettingsPayload>
          }
          aggregate: {
            args: Prisma.ClubSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClubSettings>
          }
          groupBy: {
            args: Prisma.ClubSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClubSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClubSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<ClubSettingsCountAggregateOutputType> | number
          }
        }
      }
      EmailList: {
        payload: Prisma.$EmailListPayload<ExtArgs>
        fields: Prisma.EmailListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload>
          }
          findFirst: {
            args: Prisma.EmailListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload>
          }
          findMany: {
            args: Prisma.EmailListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload>[]
          }
          create: {
            args: Prisma.EmailListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload>
          }
          createMany: {
            args: Prisma.EmailListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload>[]
          }
          delete: {
            args: Prisma.EmailListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload>
          }
          update: {
            args: Prisma.EmailListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload>
          }
          deleteMany: {
            args: Prisma.EmailListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailListUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload>[]
          }
          upsert: {
            args: Prisma.EmailListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailListPayload>
          }
          aggregate: {
            args: Prisma.EmailListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailList>
          }
          groupBy: {
            args: Prisma.EmailListGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailListGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailListCountArgs<ExtArgs>
            result: $Utils.Optional<EmailListCountAggregateOutputType> | number
          }
        }
      }
      Subscriber: {
        payload: Prisma.$SubscriberPayload<ExtArgs>
        fields: Prisma.SubscriberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          findFirst: {
            args: Prisma.SubscriberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          findMany: {
            args: Prisma.SubscriberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>[]
          }
          create: {
            args: Prisma.SubscriberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          createMany: {
            args: Prisma.SubscriberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>[]
          }
          delete: {
            args: Prisma.SubscriberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          update: {
            args: Prisma.SubscriberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          deleteMany: {
            args: Prisma.SubscriberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>[]
          }
          upsert: {
            args: Prisma.SubscriberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          aggregate: {
            args: Prisma.SubscriberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriber>
          }
          groupBy: {
            args: Prisma.SubscriberGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriberGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriberCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriberCountAggregateOutputType> | number
          }
        }
      }
      SubscriberListMembership: {
        payload: Prisma.$SubscriberListMembershipPayload<ExtArgs>
        fields: Prisma.SubscriberListMembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriberListMembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriberListMembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload>
          }
          findFirst: {
            args: Prisma.SubscriberListMembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriberListMembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload>
          }
          findMany: {
            args: Prisma.SubscriberListMembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload>[]
          }
          create: {
            args: Prisma.SubscriberListMembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload>
          }
          createMany: {
            args: Prisma.SubscriberListMembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriberListMembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload>[]
          }
          delete: {
            args: Prisma.SubscriberListMembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload>
          }
          update: {
            args: Prisma.SubscriberListMembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload>
          }
          deleteMany: {
            args: Prisma.SubscriberListMembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriberListMembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriberListMembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload>[]
          }
          upsert: {
            args: Prisma.SubscriberListMembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberListMembershipPayload>
          }
          aggregate: {
            args: Prisma.SubscriberListMembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriberListMembership>
          }
          groupBy: {
            args: Prisma.SubscriberListMembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriberListMembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriberListMembershipCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriberListMembershipCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
      EmailEvent: {
        payload: Prisma.$EmailEventPayload<ExtArgs>
        fields: Prisma.EmailEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          findFirst: {
            args: Prisma.EmailEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          findMany: {
            args: Prisma.EmailEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>[]
          }
          create: {
            args: Prisma.EmailEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          createMany: {
            args: Prisma.EmailEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>[]
          }
          delete: {
            args: Prisma.EmailEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          update: {
            args: Prisma.EmailEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          deleteMany: {
            args: Prisma.EmailEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>[]
          }
          upsert: {
            args: Prisma.EmailEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          aggregate: {
            args: Prisma.EmailEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailEvent>
          }
          groupBy: {
            args: Prisma.EmailEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailEventCountArgs<ExtArgs>
            result: $Utils.Optional<EmailEventCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    club?: ClubOmit
    clubMember?: ClubMemberOmit
    clubSettings?: ClubSettingsOmit
    emailList?: EmailListOmit
    subscriber?: SubscriberOmit
    subscriberListMembership?: SubscriberListMembershipOmit
    campaign?: CampaignOmit
    emailEvent?: EmailEventOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    sessions: number
    accounts: number
    clubsCreated: number
    clubMemberships: number
    campaignsCreated: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    clubsCreated?: boolean | UserCountOutputTypeCountClubsCreatedArgs
    clubMemberships?: boolean | UserCountOutputTypeCountClubMembershipsArgs
    campaignsCreated?: boolean | UserCountOutputTypeCountCampaignsCreatedArgs
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
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClubsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClubMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCampaignsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }


  /**
   * Count Type ClubCountOutputType
   */

  export type ClubCountOutputType = {
    members: number
    emailLists: number
    subscribers: number
    campaigns: number
  }

  export type ClubCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ClubCountOutputTypeCountMembersArgs
    emailLists?: boolean | ClubCountOutputTypeCountEmailListsArgs
    subscribers?: boolean | ClubCountOutputTypeCountSubscribersArgs
    campaigns?: boolean | ClubCountOutputTypeCountCampaignsArgs
  }

  // Custom InputTypes
  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubCountOutputType
     */
    select?: ClubCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubMemberWhereInput
  }

  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeCountEmailListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailListWhereInput
  }

  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeCountSubscribersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriberWhereInput
  }

  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }


  /**
   * Count Type EmailListCountOutputType
   */

  export type EmailListCountOutputType = {
    memberships: number
    campaigns: number
  }

  export type EmailListCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | EmailListCountOutputTypeCountMembershipsArgs
    campaigns?: boolean | EmailListCountOutputTypeCountCampaignsArgs
  }

  // Custom InputTypes
  /**
   * EmailListCountOutputType without action
   */
  export type EmailListCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailListCountOutputType
     */
    select?: EmailListCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmailListCountOutputType without action
   */
  export type EmailListCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriberListMembershipWhereInput
  }

  /**
   * EmailListCountOutputType without action
   */
  export type EmailListCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }


  /**
   * Count Type SubscriberCountOutputType
   */

  export type SubscriberCountOutputType = {
    listMemberships: number
    emailEvents: number
  }

  export type SubscriberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listMemberships?: boolean | SubscriberCountOutputTypeCountListMembershipsArgs
    emailEvents?: boolean | SubscriberCountOutputTypeCountEmailEventsArgs
  }

  // Custom InputTypes
  /**
   * SubscriberCountOutputType without action
   */
  export type SubscriberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberCountOutputType
     */
    select?: SubscriberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriberCountOutputType without action
   */
  export type SubscriberCountOutputTypeCountListMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriberListMembershipWhereInput
  }

  /**
   * SubscriberCountOutputType without action
   */
  export type SubscriberCountOutputTypeCountEmailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailEventWhereInput
  }


  /**
   * Count Type CampaignCountOutputType
   */

  export type CampaignCountOutputType = {
    emailEvents: number
  }

  export type CampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emailEvents?: boolean | CampaignCountOutputTypeCountEmailEventsArgs
  }

  // Custom InputTypes
  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCountOutputType
     */
    select?: CampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountEmailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailEventWhereInput
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
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
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
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    role: $Enums.UserRole
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
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    clubsCreated?: boolean | User$clubsCreatedArgs<ExtArgs>
    clubMemberships?: boolean | User$clubMembershipsArgs<ExtArgs>
    campaignsCreated?: boolean | User$campaignsCreatedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    clubsCreated?: boolean | User$clubsCreatedArgs<ExtArgs>
    clubMemberships?: boolean | User$clubMembershipsArgs<ExtArgs>
    campaignsCreated?: boolean | User$campaignsCreatedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      clubsCreated: Prisma.$ClubPayload<ExtArgs>[]
      clubMemberships: Prisma.$ClubMemberPayload<ExtArgs>[]
      campaignsCreated: Prisma.$CampaignPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      role: $Enums.UserRole
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
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clubsCreated<T extends User$clubsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$clubsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clubMemberships<T extends User$clubMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$clubMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaignsCreated<T extends User$campaignsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$campaignsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
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
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.clubsCreated
   */
  export type User$clubsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    where?: ClubWhereInput
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    cursor?: ClubWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * User.clubMemberships
   */
  export type User$clubMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    where?: ClubMemberWhereInput
    orderBy?: ClubMemberOrderByWithRelationInput | ClubMemberOrderByWithRelationInput[]
    cursor?: ClubMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClubMemberScalarFieldEnum | ClubMemberScalarFieldEnum[]
  }

  /**
   * User.campaignsCreated
   */
  export type User$campaignsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
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
   * Model Club
   */

  export type AggregateClub = {
    _count: ClubCountAggregateOutputType | null
    _min: ClubMinAggregateOutputType | null
    _max: ClubMaxAggregateOutputType | null
  }

  export type ClubMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type ClubMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type ClubCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    isActive: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type ClubMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type ClubMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type ClubCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type ClubAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Club to aggregate.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clubs
    **/
    _count?: true | ClubCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClubMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClubMaxAggregateInputType
  }

  export type GetClubAggregateType<T extends ClubAggregateArgs> = {
        [P in keyof T & keyof AggregateClub]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClub[P]>
      : GetScalarType<T[P], AggregateClub[P]>
  }




  export type ClubGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubWhereInput
    orderBy?: ClubOrderByWithAggregationInput | ClubOrderByWithAggregationInput[]
    by: ClubScalarFieldEnum[] | ClubScalarFieldEnum
    having?: ClubScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClubCountAggregateInputType | true
    _min?: ClubMinAggregateInputType
    _max?: ClubMaxAggregateInputType
  }

  export type ClubGroupByOutputType = {
    id: string
    name: string
    slug: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    createdById: string
    _count: ClubCountAggregateOutputType | null
    _min: ClubMinAggregateOutputType | null
    _max: ClubMaxAggregateOutputType | null
  }

  type GetClubGroupByPayload<T extends ClubGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClubGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClubGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClubGroupByOutputType[P]>
            : GetScalarType<T[P], ClubGroupByOutputType[P]>
        }
      >
    >


  export type ClubSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Club$membersArgs<ExtArgs>
    settings?: boolean | Club$settingsArgs<ExtArgs>
    emailLists?: boolean | Club$emailListsArgs<ExtArgs>
    subscribers?: boolean | Club$subscribersArgs<ExtArgs>
    campaigns?: boolean | Club$campaignsArgs<ExtArgs>
    _count?: boolean | ClubCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["club"]>

  export type ClubSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["club"]>

  export type ClubSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["club"]>

  export type ClubSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type ClubOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "isActive" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["club"]>
  export type ClubInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Club$membersArgs<ExtArgs>
    settings?: boolean | Club$settingsArgs<ExtArgs>
    emailLists?: boolean | Club$emailListsArgs<ExtArgs>
    subscribers?: boolean | Club$subscribersArgs<ExtArgs>
    campaigns?: boolean | Club$campaignsArgs<ExtArgs>
    _count?: boolean | ClubCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClubIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClubIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClubPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Club"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$ClubMemberPayload<ExtArgs>[]
      settings: Prisma.$ClubSettingsPayload<ExtArgs> | null
      emailLists: Prisma.$EmailListPayload<ExtArgs>[]
      subscribers: Prisma.$SubscriberPayload<ExtArgs>[]
      campaigns: Prisma.$CampaignPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      createdById: string
    }, ExtArgs["result"]["club"]>
    composites: {}
  }

  type ClubGetPayload<S extends boolean | null | undefined | ClubDefaultArgs> = $Result.GetResult<Prisma.$ClubPayload, S>

  type ClubCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClubFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClubCountAggregateInputType | true
    }

  export interface ClubDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Club'], meta: { name: 'Club' } }
    /**
     * Find zero or one Club that matches the filter.
     * @param {ClubFindUniqueArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClubFindUniqueArgs>(args: SelectSubset<T, ClubFindUniqueArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Club that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClubFindUniqueOrThrowArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClubFindUniqueOrThrowArgs>(args: SelectSubset<T, ClubFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Club that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindFirstArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClubFindFirstArgs>(args?: SelectSubset<T, ClubFindFirstArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Club that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindFirstOrThrowArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClubFindFirstOrThrowArgs>(args?: SelectSubset<T, ClubFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clubs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clubs
     * const clubs = await prisma.club.findMany()
     * 
     * // Get first 10 Clubs
     * const clubs = await prisma.club.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clubWithIdOnly = await prisma.club.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClubFindManyArgs>(args?: SelectSubset<T, ClubFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Club.
     * @param {ClubCreateArgs} args - Arguments to create a Club.
     * @example
     * // Create one Club
     * const Club = await prisma.club.create({
     *   data: {
     *     // ... data to create a Club
     *   }
     * })
     * 
     */
    create<T extends ClubCreateArgs>(args: SelectSubset<T, ClubCreateArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clubs.
     * @param {ClubCreateManyArgs} args - Arguments to create many Clubs.
     * @example
     * // Create many Clubs
     * const club = await prisma.club.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClubCreateManyArgs>(args?: SelectSubset<T, ClubCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clubs and returns the data saved in the database.
     * @param {ClubCreateManyAndReturnArgs} args - Arguments to create many Clubs.
     * @example
     * // Create many Clubs
     * const club = await prisma.club.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clubs and only return the `id`
     * const clubWithIdOnly = await prisma.club.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClubCreateManyAndReturnArgs>(args?: SelectSubset<T, ClubCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Club.
     * @param {ClubDeleteArgs} args - Arguments to delete one Club.
     * @example
     * // Delete one Club
     * const Club = await prisma.club.delete({
     *   where: {
     *     // ... filter to delete one Club
     *   }
     * })
     * 
     */
    delete<T extends ClubDeleteArgs>(args: SelectSubset<T, ClubDeleteArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Club.
     * @param {ClubUpdateArgs} args - Arguments to update one Club.
     * @example
     * // Update one Club
     * const club = await prisma.club.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClubUpdateArgs>(args: SelectSubset<T, ClubUpdateArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clubs.
     * @param {ClubDeleteManyArgs} args - Arguments to filter Clubs to delete.
     * @example
     * // Delete a few Clubs
     * const { count } = await prisma.club.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClubDeleteManyArgs>(args?: SelectSubset<T, ClubDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clubs
     * const club = await prisma.club.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClubUpdateManyArgs>(args: SelectSubset<T, ClubUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clubs and returns the data updated in the database.
     * @param {ClubUpdateManyAndReturnArgs} args - Arguments to update many Clubs.
     * @example
     * // Update many Clubs
     * const club = await prisma.club.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clubs and only return the `id`
     * const clubWithIdOnly = await prisma.club.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClubUpdateManyAndReturnArgs>(args: SelectSubset<T, ClubUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Club.
     * @param {ClubUpsertArgs} args - Arguments to update or create a Club.
     * @example
     * // Update or create a Club
     * const club = await prisma.club.upsert({
     *   create: {
     *     // ... data to create a Club
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Club we want to update
     *   }
     * })
     */
    upsert<T extends ClubUpsertArgs>(args: SelectSubset<T, ClubUpsertArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubCountArgs} args - Arguments to filter Clubs to count.
     * @example
     * // Count the number of Clubs
     * const count = await prisma.club.count({
     *   where: {
     *     // ... the filter for the Clubs we want to count
     *   }
     * })
    **/
    count<T extends ClubCountArgs>(
      args?: Subset<T, ClubCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClubCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Club.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClubAggregateArgs>(args: Subset<T, ClubAggregateArgs>): Prisma.PrismaPromise<GetClubAggregateType<T>>

    /**
     * Group by Club.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubGroupByArgs} args - Group by arguments.
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
      T extends ClubGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClubGroupByArgs['orderBy'] }
        : { orderBy?: ClubGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClubGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClubGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Club model
   */
  readonly fields: ClubFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Club.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClubClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Club$membersArgs<ExtArgs> = {}>(args?: Subset<T, Club$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settings<T extends Club$settingsArgs<ExtArgs> = {}>(args?: Subset<T, Club$settingsArgs<ExtArgs>>): Prisma__ClubSettingsClient<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    emailLists<T extends Club$emailListsArgs<ExtArgs> = {}>(args?: Subset<T, Club$emailListsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscribers<T extends Club$subscribersArgs<ExtArgs> = {}>(args?: Subset<T, Club$subscribersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaigns<T extends Club$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, Club$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Club model
   */
  interface ClubFieldRefs {
    readonly id: FieldRef<"Club", 'String'>
    readonly name: FieldRef<"Club", 'String'>
    readonly slug: FieldRef<"Club", 'String'>
    readonly isActive: FieldRef<"Club", 'Boolean'>
    readonly createdAt: FieldRef<"Club", 'DateTime'>
    readonly updatedAt: FieldRef<"Club", 'DateTime'>
    readonly createdById: FieldRef<"Club", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Club findUnique
   */
  export type ClubFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club findUniqueOrThrow
   */
  export type ClubFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club findFirst
   */
  export type ClubFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clubs.
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clubs.
     */
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * Club findFirstOrThrow
   */
  export type ClubFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clubs.
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clubs.
     */
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * Club findMany
   */
  export type ClubFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Clubs to fetch.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clubs.
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * Club create
   */
  export type ClubCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * The data needed to create a Club.
     */
    data: XOR<ClubCreateInput, ClubUncheckedCreateInput>
  }

  /**
   * Club createMany
   */
  export type ClubCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clubs.
     */
    data: ClubCreateManyInput | ClubCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Club createManyAndReturn
   */
  export type ClubCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * The data used to create many Clubs.
     */
    data: ClubCreateManyInput | ClubCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Club update
   */
  export type ClubUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * The data needed to update a Club.
     */
    data: XOR<ClubUpdateInput, ClubUncheckedUpdateInput>
    /**
     * Choose, which Club to update.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club updateMany
   */
  export type ClubUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clubs.
     */
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyInput>
    /**
     * Filter which Clubs to update
     */
    where?: ClubWhereInput
    /**
     * Limit how many Clubs to update.
     */
    limit?: number
  }

  /**
   * Club updateManyAndReturn
   */
  export type ClubUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * The data used to update Clubs.
     */
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyInput>
    /**
     * Filter which Clubs to update
     */
    where?: ClubWhereInput
    /**
     * Limit how many Clubs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Club upsert
   */
  export type ClubUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * The filter to search for the Club to update in case it exists.
     */
    where: ClubWhereUniqueInput
    /**
     * In case the Club found by the `where` argument doesn't exist, create a new Club with this data.
     */
    create: XOR<ClubCreateInput, ClubUncheckedCreateInput>
    /**
     * In case the Club was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClubUpdateInput, ClubUncheckedUpdateInput>
  }

  /**
   * Club delete
   */
  export type ClubDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter which Club to delete.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club deleteMany
   */
  export type ClubDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clubs to delete
     */
    where?: ClubWhereInput
    /**
     * Limit how many Clubs to delete.
     */
    limit?: number
  }

  /**
   * Club.members
   */
  export type Club$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    where?: ClubMemberWhereInput
    orderBy?: ClubMemberOrderByWithRelationInput | ClubMemberOrderByWithRelationInput[]
    cursor?: ClubMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClubMemberScalarFieldEnum | ClubMemberScalarFieldEnum[]
  }

  /**
   * Club.settings
   */
  export type Club$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    where?: ClubSettingsWhereInput
  }

  /**
   * Club.emailLists
   */
  export type Club$emailListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    where?: EmailListWhereInput
    orderBy?: EmailListOrderByWithRelationInput | EmailListOrderByWithRelationInput[]
    cursor?: EmailListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailListScalarFieldEnum | EmailListScalarFieldEnum[]
  }

  /**
   * Club.subscribers
   */
  export type Club$subscribersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    where?: SubscriberWhereInput
    orderBy?: SubscriberOrderByWithRelationInput | SubscriberOrderByWithRelationInput[]
    cursor?: SubscriberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriberScalarFieldEnum | SubscriberScalarFieldEnum[]
  }

  /**
   * Club.campaigns
   */
  export type Club$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Club without action
   */
  export type ClubDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
  }


  /**
   * Model ClubMember
   */

  export type AggregateClubMember = {
    _count: ClubMemberCountAggregateOutputType | null
    _min: ClubMemberMinAggregateOutputType | null
    _max: ClubMemberMaxAggregateOutputType | null
  }

  export type ClubMemberMinAggregateOutputType = {
    id: string | null
    role: $Enums.ClubRole | null
    createdAt: Date | null
    clubId: string | null
    userId: string | null
  }

  export type ClubMemberMaxAggregateOutputType = {
    id: string | null
    role: $Enums.ClubRole | null
    createdAt: Date | null
    clubId: string | null
    userId: string | null
  }

  export type ClubMemberCountAggregateOutputType = {
    id: number
    role: number
    createdAt: number
    clubId: number
    userId: number
    _all: number
  }


  export type ClubMemberMinAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    clubId?: true
    userId?: true
  }

  export type ClubMemberMaxAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    clubId?: true
    userId?: true
  }

  export type ClubMemberCountAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    clubId?: true
    userId?: true
    _all?: true
  }

  export type ClubMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClubMember to aggregate.
     */
    where?: ClubMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubMembers to fetch.
     */
    orderBy?: ClubMemberOrderByWithRelationInput | ClubMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClubMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClubMembers
    **/
    _count?: true | ClubMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClubMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClubMemberMaxAggregateInputType
  }

  export type GetClubMemberAggregateType<T extends ClubMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateClubMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClubMember[P]>
      : GetScalarType<T[P], AggregateClubMember[P]>
  }




  export type ClubMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubMemberWhereInput
    orderBy?: ClubMemberOrderByWithAggregationInput | ClubMemberOrderByWithAggregationInput[]
    by: ClubMemberScalarFieldEnum[] | ClubMemberScalarFieldEnum
    having?: ClubMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClubMemberCountAggregateInputType | true
    _min?: ClubMemberMinAggregateInputType
    _max?: ClubMemberMaxAggregateInputType
  }

  export type ClubMemberGroupByOutputType = {
    id: string
    role: $Enums.ClubRole
    createdAt: Date
    clubId: string
    userId: string
    _count: ClubMemberCountAggregateOutputType | null
    _min: ClubMemberMinAggregateOutputType | null
    _max: ClubMemberMaxAggregateOutputType | null
  }

  type GetClubMemberGroupByPayload<T extends ClubMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClubMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClubMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClubMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ClubMemberGroupByOutputType[P]>
        }
      >
    >


  export type ClubMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    clubId?: boolean
    userId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clubMember"]>

  export type ClubMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    clubId?: boolean
    userId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clubMember"]>

  export type ClubMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    clubId?: boolean
    userId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clubMember"]>

  export type ClubMemberSelectScalar = {
    id?: boolean
    role?: boolean
    createdAt?: boolean
    clubId?: boolean
    userId?: boolean
  }

  export type ClubMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "createdAt" | "clubId" | "userId", ExtArgs["result"]["clubMember"]>
  export type ClubMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClubMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClubMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClubMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClubMember"
    objects: {
      club: Prisma.$ClubPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.ClubRole
      createdAt: Date
      clubId: string
      userId: string
    }, ExtArgs["result"]["clubMember"]>
    composites: {}
  }

  type ClubMemberGetPayload<S extends boolean | null | undefined | ClubMemberDefaultArgs> = $Result.GetResult<Prisma.$ClubMemberPayload, S>

  type ClubMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClubMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClubMemberCountAggregateInputType | true
    }

  export interface ClubMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClubMember'], meta: { name: 'ClubMember' } }
    /**
     * Find zero or one ClubMember that matches the filter.
     * @param {ClubMemberFindUniqueArgs} args - Arguments to find a ClubMember
     * @example
     * // Get one ClubMember
     * const clubMember = await prisma.clubMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClubMemberFindUniqueArgs>(args: SelectSubset<T, ClubMemberFindUniqueArgs<ExtArgs>>): Prisma__ClubMemberClient<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClubMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClubMemberFindUniqueOrThrowArgs} args - Arguments to find a ClubMember
     * @example
     * // Get one ClubMember
     * const clubMember = await prisma.clubMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClubMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ClubMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClubMemberClient<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClubMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMemberFindFirstArgs} args - Arguments to find a ClubMember
     * @example
     * // Get one ClubMember
     * const clubMember = await prisma.clubMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClubMemberFindFirstArgs>(args?: SelectSubset<T, ClubMemberFindFirstArgs<ExtArgs>>): Prisma__ClubMemberClient<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClubMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMemberFindFirstOrThrowArgs} args - Arguments to find a ClubMember
     * @example
     * // Get one ClubMember
     * const clubMember = await prisma.clubMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClubMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ClubMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClubMemberClient<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClubMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClubMembers
     * const clubMembers = await prisma.clubMember.findMany()
     * 
     * // Get first 10 ClubMembers
     * const clubMembers = await prisma.clubMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clubMemberWithIdOnly = await prisma.clubMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClubMemberFindManyArgs>(args?: SelectSubset<T, ClubMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClubMember.
     * @param {ClubMemberCreateArgs} args - Arguments to create a ClubMember.
     * @example
     * // Create one ClubMember
     * const ClubMember = await prisma.clubMember.create({
     *   data: {
     *     // ... data to create a ClubMember
     *   }
     * })
     * 
     */
    create<T extends ClubMemberCreateArgs>(args: SelectSubset<T, ClubMemberCreateArgs<ExtArgs>>): Prisma__ClubMemberClient<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClubMembers.
     * @param {ClubMemberCreateManyArgs} args - Arguments to create many ClubMembers.
     * @example
     * // Create many ClubMembers
     * const clubMember = await prisma.clubMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClubMemberCreateManyArgs>(args?: SelectSubset<T, ClubMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClubMembers and returns the data saved in the database.
     * @param {ClubMemberCreateManyAndReturnArgs} args - Arguments to create many ClubMembers.
     * @example
     * // Create many ClubMembers
     * const clubMember = await prisma.clubMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClubMembers and only return the `id`
     * const clubMemberWithIdOnly = await prisma.clubMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClubMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ClubMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClubMember.
     * @param {ClubMemberDeleteArgs} args - Arguments to delete one ClubMember.
     * @example
     * // Delete one ClubMember
     * const ClubMember = await prisma.clubMember.delete({
     *   where: {
     *     // ... filter to delete one ClubMember
     *   }
     * })
     * 
     */
    delete<T extends ClubMemberDeleteArgs>(args: SelectSubset<T, ClubMemberDeleteArgs<ExtArgs>>): Prisma__ClubMemberClient<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClubMember.
     * @param {ClubMemberUpdateArgs} args - Arguments to update one ClubMember.
     * @example
     * // Update one ClubMember
     * const clubMember = await prisma.clubMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClubMemberUpdateArgs>(args: SelectSubset<T, ClubMemberUpdateArgs<ExtArgs>>): Prisma__ClubMemberClient<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClubMembers.
     * @param {ClubMemberDeleteManyArgs} args - Arguments to filter ClubMembers to delete.
     * @example
     * // Delete a few ClubMembers
     * const { count } = await prisma.clubMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClubMemberDeleteManyArgs>(args?: SelectSubset<T, ClubMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClubMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClubMembers
     * const clubMember = await prisma.clubMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClubMemberUpdateManyArgs>(args: SelectSubset<T, ClubMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClubMembers and returns the data updated in the database.
     * @param {ClubMemberUpdateManyAndReturnArgs} args - Arguments to update many ClubMembers.
     * @example
     * // Update many ClubMembers
     * const clubMember = await prisma.clubMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClubMembers and only return the `id`
     * const clubMemberWithIdOnly = await prisma.clubMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClubMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, ClubMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClubMember.
     * @param {ClubMemberUpsertArgs} args - Arguments to update or create a ClubMember.
     * @example
     * // Update or create a ClubMember
     * const clubMember = await prisma.clubMember.upsert({
     *   create: {
     *     // ... data to create a ClubMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClubMember we want to update
     *   }
     * })
     */
    upsert<T extends ClubMemberUpsertArgs>(args: SelectSubset<T, ClubMemberUpsertArgs<ExtArgs>>): Prisma__ClubMemberClient<$Result.GetResult<Prisma.$ClubMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClubMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMemberCountArgs} args - Arguments to filter ClubMembers to count.
     * @example
     * // Count the number of ClubMembers
     * const count = await prisma.clubMember.count({
     *   where: {
     *     // ... the filter for the ClubMembers we want to count
     *   }
     * })
    **/
    count<T extends ClubMemberCountArgs>(
      args?: Subset<T, ClubMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClubMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClubMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClubMemberAggregateArgs>(args: Subset<T, ClubMemberAggregateArgs>): Prisma.PrismaPromise<GetClubMemberAggregateType<T>>

    /**
     * Group by ClubMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMemberGroupByArgs} args - Group by arguments.
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
      T extends ClubMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClubMemberGroupByArgs['orderBy'] }
        : { orderBy?: ClubMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClubMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClubMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClubMember model
   */
  readonly fields: ClubMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClubMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClubMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClubDefaultArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClubMember model
   */
  interface ClubMemberFieldRefs {
    readonly id: FieldRef<"ClubMember", 'String'>
    readonly role: FieldRef<"ClubMember", 'ClubRole'>
    readonly createdAt: FieldRef<"ClubMember", 'DateTime'>
    readonly clubId: FieldRef<"ClubMember", 'String'>
    readonly userId: FieldRef<"ClubMember", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ClubMember findUnique
   */
  export type ClubMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClubMember to fetch.
     */
    where: ClubMemberWhereUniqueInput
  }

  /**
   * ClubMember findUniqueOrThrow
   */
  export type ClubMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClubMember to fetch.
     */
    where: ClubMemberWhereUniqueInput
  }

  /**
   * ClubMember findFirst
   */
  export type ClubMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClubMember to fetch.
     */
    where?: ClubMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubMembers to fetch.
     */
    orderBy?: ClubMemberOrderByWithRelationInput | ClubMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClubMembers.
     */
    cursor?: ClubMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClubMembers.
     */
    distinct?: ClubMemberScalarFieldEnum | ClubMemberScalarFieldEnum[]
  }

  /**
   * ClubMember findFirstOrThrow
   */
  export type ClubMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClubMember to fetch.
     */
    where?: ClubMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubMembers to fetch.
     */
    orderBy?: ClubMemberOrderByWithRelationInput | ClubMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClubMembers.
     */
    cursor?: ClubMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClubMembers.
     */
    distinct?: ClubMemberScalarFieldEnum | ClubMemberScalarFieldEnum[]
  }

  /**
   * ClubMember findMany
   */
  export type ClubMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClubMembers to fetch.
     */
    where?: ClubMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubMembers to fetch.
     */
    orderBy?: ClubMemberOrderByWithRelationInput | ClubMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClubMembers.
     */
    cursor?: ClubMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubMembers.
     */
    skip?: number
    distinct?: ClubMemberScalarFieldEnum | ClubMemberScalarFieldEnum[]
  }

  /**
   * ClubMember create
   */
  export type ClubMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ClubMember.
     */
    data: XOR<ClubMemberCreateInput, ClubMemberUncheckedCreateInput>
  }

  /**
   * ClubMember createMany
   */
  export type ClubMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClubMembers.
     */
    data: ClubMemberCreateManyInput | ClubMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClubMember createManyAndReturn
   */
  export type ClubMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * The data used to create many ClubMembers.
     */
    data: ClubMemberCreateManyInput | ClubMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClubMember update
   */
  export type ClubMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ClubMember.
     */
    data: XOR<ClubMemberUpdateInput, ClubMemberUncheckedUpdateInput>
    /**
     * Choose, which ClubMember to update.
     */
    where: ClubMemberWhereUniqueInput
  }

  /**
   * ClubMember updateMany
   */
  export type ClubMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClubMembers.
     */
    data: XOR<ClubMemberUpdateManyMutationInput, ClubMemberUncheckedUpdateManyInput>
    /**
     * Filter which ClubMembers to update
     */
    where?: ClubMemberWhereInput
    /**
     * Limit how many ClubMembers to update.
     */
    limit?: number
  }

  /**
   * ClubMember updateManyAndReturn
   */
  export type ClubMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * The data used to update ClubMembers.
     */
    data: XOR<ClubMemberUpdateManyMutationInput, ClubMemberUncheckedUpdateManyInput>
    /**
     * Filter which ClubMembers to update
     */
    where?: ClubMemberWhereInput
    /**
     * Limit how many ClubMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClubMember upsert
   */
  export type ClubMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ClubMember to update in case it exists.
     */
    where: ClubMemberWhereUniqueInput
    /**
     * In case the ClubMember found by the `where` argument doesn't exist, create a new ClubMember with this data.
     */
    create: XOR<ClubMemberCreateInput, ClubMemberUncheckedCreateInput>
    /**
     * In case the ClubMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClubMemberUpdateInput, ClubMemberUncheckedUpdateInput>
  }

  /**
   * ClubMember delete
   */
  export type ClubMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
    /**
     * Filter which ClubMember to delete.
     */
    where: ClubMemberWhereUniqueInput
  }

  /**
   * ClubMember deleteMany
   */
  export type ClubMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClubMembers to delete
     */
    where?: ClubMemberWhereInput
    /**
     * Limit how many ClubMembers to delete.
     */
    limit?: number
  }

  /**
   * ClubMember without action
   */
  export type ClubMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMember
     */
    select?: ClubMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMember
     */
    omit?: ClubMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMemberInclude<ExtArgs> | null
  }


  /**
   * Model ClubSettings
   */

  export type AggregateClubSettings = {
    _count: ClubSettingsCountAggregateOutputType | null
    _min: ClubSettingsMinAggregateOutputType | null
    _max: ClubSettingsMaxAggregateOutputType | null
  }

  export type ClubSettingsMinAggregateOutputType = {
    id: string | null
    fromName: string | null
    fromEmail: string | null
    replyToEmail: string | null
    defaultSubjectPrefix: string | null
    footerText: string | null
    physicalAddress: string | null
    clubId: string | null
  }

  export type ClubSettingsMaxAggregateOutputType = {
    id: string | null
    fromName: string | null
    fromEmail: string | null
    replyToEmail: string | null
    defaultSubjectPrefix: string | null
    footerText: string | null
    physicalAddress: string | null
    clubId: string | null
  }

  export type ClubSettingsCountAggregateOutputType = {
    id: number
    fromName: number
    fromEmail: number
    replyToEmail: number
    defaultSubjectPrefix: number
    footerText: number
    physicalAddress: number
    clubId: number
    _all: number
  }


  export type ClubSettingsMinAggregateInputType = {
    id?: true
    fromName?: true
    fromEmail?: true
    replyToEmail?: true
    defaultSubjectPrefix?: true
    footerText?: true
    physicalAddress?: true
    clubId?: true
  }

  export type ClubSettingsMaxAggregateInputType = {
    id?: true
    fromName?: true
    fromEmail?: true
    replyToEmail?: true
    defaultSubjectPrefix?: true
    footerText?: true
    physicalAddress?: true
    clubId?: true
  }

  export type ClubSettingsCountAggregateInputType = {
    id?: true
    fromName?: true
    fromEmail?: true
    replyToEmail?: true
    defaultSubjectPrefix?: true
    footerText?: true
    physicalAddress?: true
    clubId?: true
    _all?: true
  }

  export type ClubSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClubSettings to aggregate.
     */
    where?: ClubSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubSettings to fetch.
     */
    orderBy?: ClubSettingsOrderByWithRelationInput | ClubSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClubSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClubSettings
    **/
    _count?: true | ClubSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClubSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClubSettingsMaxAggregateInputType
  }

  export type GetClubSettingsAggregateType<T extends ClubSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateClubSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClubSettings[P]>
      : GetScalarType<T[P], AggregateClubSettings[P]>
  }




  export type ClubSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubSettingsWhereInput
    orderBy?: ClubSettingsOrderByWithAggregationInput | ClubSettingsOrderByWithAggregationInput[]
    by: ClubSettingsScalarFieldEnum[] | ClubSettingsScalarFieldEnum
    having?: ClubSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClubSettingsCountAggregateInputType | true
    _min?: ClubSettingsMinAggregateInputType
    _max?: ClubSettingsMaxAggregateInputType
  }

  export type ClubSettingsGroupByOutputType = {
    id: string
    fromName: string
    fromEmail: string
    replyToEmail: string | null
    defaultSubjectPrefix: string | null
    footerText: string | null
    physicalAddress: string | null
    clubId: string
    _count: ClubSettingsCountAggregateOutputType | null
    _min: ClubSettingsMinAggregateOutputType | null
    _max: ClubSettingsMaxAggregateOutputType | null
  }

  type GetClubSettingsGroupByPayload<T extends ClubSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClubSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClubSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClubSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], ClubSettingsGroupByOutputType[P]>
        }
      >
    >


  export type ClubSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromName?: boolean
    fromEmail?: boolean
    replyToEmail?: boolean
    defaultSubjectPrefix?: boolean
    footerText?: boolean
    physicalAddress?: boolean
    clubId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clubSettings"]>

  export type ClubSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromName?: boolean
    fromEmail?: boolean
    replyToEmail?: boolean
    defaultSubjectPrefix?: boolean
    footerText?: boolean
    physicalAddress?: boolean
    clubId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clubSettings"]>

  export type ClubSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromName?: boolean
    fromEmail?: boolean
    replyToEmail?: boolean
    defaultSubjectPrefix?: boolean
    footerText?: boolean
    physicalAddress?: boolean
    clubId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clubSettings"]>

  export type ClubSettingsSelectScalar = {
    id?: boolean
    fromName?: boolean
    fromEmail?: boolean
    replyToEmail?: boolean
    defaultSubjectPrefix?: boolean
    footerText?: boolean
    physicalAddress?: boolean
    clubId?: boolean
  }

  export type ClubSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fromName" | "fromEmail" | "replyToEmail" | "defaultSubjectPrefix" | "footerText" | "physicalAddress" | "clubId", ExtArgs["result"]["clubSettings"]>
  export type ClubSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type ClubSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type ClubSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }

  export type $ClubSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClubSettings"
    objects: {
      club: Prisma.$ClubPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fromName: string
      fromEmail: string
      replyToEmail: string | null
      defaultSubjectPrefix: string | null
      footerText: string | null
      physicalAddress: string | null
      clubId: string
    }, ExtArgs["result"]["clubSettings"]>
    composites: {}
  }

  type ClubSettingsGetPayload<S extends boolean | null | undefined | ClubSettingsDefaultArgs> = $Result.GetResult<Prisma.$ClubSettingsPayload, S>

  type ClubSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClubSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClubSettingsCountAggregateInputType | true
    }

  export interface ClubSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClubSettings'], meta: { name: 'ClubSettings' } }
    /**
     * Find zero or one ClubSettings that matches the filter.
     * @param {ClubSettingsFindUniqueArgs} args - Arguments to find a ClubSettings
     * @example
     * // Get one ClubSettings
     * const clubSettings = await prisma.clubSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClubSettingsFindUniqueArgs>(args: SelectSubset<T, ClubSettingsFindUniqueArgs<ExtArgs>>): Prisma__ClubSettingsClient<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClubSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClubSettingsFindUniqueOrThrowArgs} args - Arguments to find a ClubSettings
     * @example
     * // Get one ClubSettings
     * const clubSettings = await prisma.clubSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClubSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, ClubSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClubSettingsClient<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClubSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubSettingsFindFirstArgs} args - Arguments to find a ClubSettings
     * @example
     * // Get one ClubSettings
     * const clubSettings = await prisma.clubSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClubSettingsFindFirstArgs>(args?: SelectSubset<T, ClubSettingsFindFirstArgs<ExtArgs>>): Prisma__ClubSettingsClient<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClubSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubSettingsFindFirstOrThrowArgs} args - Arguments to find a ClubSettings
     * @example
     * // Get one ClubSettings
     * const clubSettings = await prisma.clubSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClubSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, ClubSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClubSettingsClient<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClubSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClubSettings
     * const clubSettings = await prisma.clubSettings.findMany()
     * 
     * // Get first 10 ClubSettings
     * const clubSettings = await prisma.clubSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clubSettingsWithIdOnly = await prisma.clubSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClubSettingsFindManyArgs>(args?: SelectSubset<T, ClubSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClubSettings.
     * @param {ClubSettingsCreateArgs} args - Arguments to create a ClubSettings.
     * @example
     * // Create one ClubSettings
     * const ClubSettings = await prisma.clubSettings.create({
     *   data: {
     *     // ... data to create a ClubSettings
     *   }
     * })
     * 
     */
    create<T extends ClubSettingsCreateArgs>(args: SelectSubset<T, ClubSettingsCreateArgs<ExtArgs>>): Prisma__ClubSettingsClient<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClubSettings.
     * @param {ClubSettingsCreateManyArgs} args - Arguments to create many ClubSettings.
     * @example
     * // Create many ClubSettings
     * const clubSettings = await prisma.clubSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClubSettingsCreateManyArgs>(args?: SelectSubset<T, ClubSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClubSettings and returns the data saved in the database.
     * @param {ClubSettingsCreateManyAndReturnArgs} args - Arguments to create many ClubSettings.
     * @example
     * // Create many ClubSettings
     * const clubSettings = await prisma.clubSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClubSettings and only return the `id`
     * const clubSettingsWithIdOnly = await prisma.clubSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClubSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, ClubSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClubSettings.
     * @param {ClubSettingsDeleteArgs} args - Arguments to delete one ClubSettings.
     * @example
     * // Delete one ClubSettings
     * const ClubSettings = await prisma.clubSettings.delete({
     *   where: {
     *     // ... filter to delete one ClubSettings
     *   }
     * })
     * 
     */
    delete<T extends ClubSettingsDeleteArgs>(args: SelectSubset<T, ClubSettingsDeleteArgs<ExtArgs>>): Prisma__ClubSettingsClient<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClubSettings.
     * @param {ClubSettingsUpdateArgs} args - Arguments to update one ClubSettings.
     * @example
     * // Update one ClubSettings
     * const clubSettings = await prisma.clubSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClubSettingsUpdateArgs>(args: SelectSubset<T, ClubSettingsUpdateArgs<ExtArgs>>): Prisma__ClubSettingsClient<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClubSettings.
     * @param {ClubSettingsDeleteManyArgs} args - Arguments to filter ClubSettings to delete.
     * @example
     * // Delete a few ClubSettings
     * const { count } = await prisma.clubSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClubSettingsDeleteManyArgs>(args?: SelectSubset<T, ClubSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClubSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClubSettings
     * const clubSettings = await prisma.clubSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClubSettingsUpdateManyArgs>(args: SelectSubset<T, ClubSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClubSettings and returns the data updated in the database.
     * @param {ClubSettingsUpdateManyAndReturnArgs} args - Arguments to update many ClubSettings.
     * @example
     * // Update many ClubSettings
     * const clubSettings = await prisma.clubSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClubSettings and only return the `id`
     * const clubSettingsWithIdOnly = await prisma.clubSettings.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClubSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, ClubSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClubSettings.
     * @param {ClubSettingsUpsertArgs} args - Arguments to update or create a ClubSettings.
     * @example
     * // Update or create a ClubSettings
     * const clubSettings = await prisma.clubSettings.upsert({
     *   create: {
     *     // ... data to create a ClubSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClubSettings we want to update
     *   }
     * })
     */
    upsert<T extends ClubSettingsUpsertArgs>(args: SelectSubset<T, ClubSettingsUpsertArgs<ExtArgs>>): Prisma__ClubSettingsClient<$Result.GetResult<Prisma.$ClubSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClubSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubSettingsCountArgs} args - Arguments to filter ClubSettings to count.
     * @example
     * // Count the number of ClubSettings
     * const count = await prisma.clubSettings.count({
     *   where: {
     *     // ... the filter for the ClubSettings we want to count
     *   }
     * })
    **/
    count<T extends ClubSettingsCountArgs>(
      args?: Subset<T, ClubSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClubSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClubSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClubSettingsAggregateArgs>(args: Subset<T, ClubSettingsAggregateArgs>): Prisma.PrismaPromise<GetClubSettingsAggregateType<T>>

    /**
     * Group by ClubSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubSettingsGroupByArgs} args - Group by arguments.
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
      T extends ClubSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClubSettingsGroupByArgs['orderBy'] }
        : { orderBy?: ClubSettingsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClubSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClubSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClubSettings model
   */
  readonly fields: ClubSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClubSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClubSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClubDefaultArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClubSettings model
   */
  interface ClubSettingsFieldRefs {
    readonly id: FieldRef<"ClubSettings", 'String'>
    readonly fromName: FieldRef<"ClubSettings", 'String'>
    readonly fromEmail: FieldRef<"ClubSettings", 'String'>
    readonly replyToEmail: FieldRef<"ClubSettings", 'String'>
    readonly defaultSubjectPrefix: FieldRef<"ClubSettings", 'String'>
    readonly footerText: FieldRef<"ClubSettings", 'String'>
    readonly physicalAddress: FieldRef<"ClubSettings", 'String'>
    readonly clubId: FieldRef<"ClubSettings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ClubSettings findUnique
   */
  export type ClubSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ClubSettings to fetch.
     */
    where: ClubSettingsWhereUniqueInput
  }

  /**
   * ClubSettings findUniqueOrThrow
   */
  export type ClubSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ClubSettings to fetch.
     */
    where: ClubSettingsWhereUniqueInput
  }

  /**
   * ClubSettings findFirst
   */
  export type ClubSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ClubSettings to fetch.
     */
    where?: ClubSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubSettings to fetch.
     */
    orderBy?: ClubSettingsOrderByWithRelationInput | ClubSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClubSettings.
     */
    cursor?: ClubSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClubSettings.
     */
    distinct?: ClubSettingsScalarFieldEnum | ClubSettingsScalarFieldEnum[]
  }

  /**
   * ClubSettings findFirstOrThrow
   */
  export type ClubSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ClubSettings to fetch.
     */
    where?: ClubSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubSettings to fetch.
     */
    orderBy?: ClubSettingsOrderByWithRelationInput | ClubSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClubSettings.
     */
    cursor?: ClubSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClubSettings.
     */
    distinct?: ClubSettingsScalarFieldEnum | ClubSettingsScalarFieldEnum[]
  }

  /**
   * ClubSettings findMany
   */
  export type ClubSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ClubSettings to fetch.
     */
    where?: ClubSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubSettings to fetch.
     */
    orderBy?: ClubSettingsOrderByWithRelationInput | ClubSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClubSettings.
     */
    cursor?: ClubSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubSettings.
     */
    skip?: number
    distinct?: ClubSettingsScalarFieldEnum | ClubSettingsScalarFieldEnum[]
  }

  /**
   * ClubSettings create
   */
  export type ClubSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a ClubSettings.
     */
    data: XOR<ClubSettingsCreateInput, ClubSettingsUncheckedCreateInput>
  }

  /**
   * ClubSettings createMany
   */
  export type ClubSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClubSettings.
     */
    data: ClubSettingsCreateManyInput | ClubSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClubSettings createManyAndReturn
   */
  export type ClubSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many ClubSettings.
     */
    data: ClubSettingsCreateManyInput | ClubSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClubSettings update
   */
  export type ClubSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a ClubSettings.
     */
    data: XOR<ClubSettingsUpdateInput, ClubSettingsUncheckedUpdateInput>
    /**
     * Choose, which ClubSettings to update.
     */
    where: ClubSettingsWhereUniqueInput
  }

  /**
   * ClubSettings updateMany
   */
  export type ClubSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClubSettings.
     */
    data: XOR<ClubSettingsUpdateManyMutationInput, ClubSettingsUncheckedUpdateManyInput>
    /**
     * Filter which ClubSettings to update
     */
    where?: ClubSettingsWhereInput
    /**
     * Limit how many ClubSettings to update.
     */
    limit?: number
  }

  /**
   * ClubSettings updateManyAndReturn
   */
  export type ClubSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * The data used to update ClubSettings.
     */
    data: XOR<ClubSettingsUpdateManyMutationInput, ClubSettingsUncheckedUpdateManyInput>
    /**
     * Filter which ClubSettings to update
     */
    where?: ClubSettingsWhereInput
    /**
     * Limit how many ClubSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClubSettings upsert
   */
  export type ClubSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the ClubSettings to update in case it exists.
     */
    where: ClubSettingsWhereUniqueInput
    /**
     * In case the ClubSettings found by the `where` argument doesn't exist, create a new ClubSettings with this data.
     */
    create: XOR<ClubSettingsCreateInput, ClubSettingsUncheckedCreateInput>
    /**
     * In case the ClubSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClubSettingsUpdateInput, ClubSettingsUncheckedUpdateInput>
  }

  /**
   * ClubSettings delete
   */
  export type ClubSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
    /**
     * Filter which ClubSettings to delete.
     */
    where: ClubSettingsWhereUniqueInput
  }

  /**
   * ClubSettings deleteMany
   */
  export type ClubSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClubSettings to delete
     */
    where?: ClubSettingsWhereInput
    /**
     * Limit how many ClubSettings to delete.
     */
    limit?: number
  }

  /**
   * ClubSettings without action
   */
  export type ClubSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubSettings
     */
    select?: ClubSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubSettings
     */
    omit?: ClubSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubSettingsInclude<ExtArgs> | null
  }


  /**
   * Model EmailList
   */

  export type AggregateEmailList = {
    _count: EmailListCountAggregateOutputType | null
    _min: EmailListMinAggregateOutputType | null
    _max: EmailListMaxAggregateOutputType | null
  }

  export type EmailListMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isDefault: boolean | null
    createdAt: Date | null
    clubId: string | null
  }

  export type EmailListMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isDefault: boolean | null
    createdAt: Date | null
    clubId: string | null
  }

  export type EmailListCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isDefault: number
    createdAt: number
    clubId: number
    _all: number
  }


  export type EmailListMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isDefault?: true
    createdAt?: true
    clubId?: true
  }

  export type EmailListMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isDefault?: true
    createdAt?: true
    clubId?: true
  }

  export type EmailListCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isDefault?: true
    createdAt?: true
    clubId?: true
    _all?: true
  }

  export type EmailListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailList to aggregate.
     */
    where?: EmailListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailLists to fetch.
     */
    orderBy?: EmailListOrderByWithRelationInput | EmailListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailLists
    **/
    _count?: true | EmailListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailListMaxAggregateInputType
  }

  export type GetEmailListAggregateType<T extends EmailListAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailList[P]>
      : GetScalarType<T[P], AggregateEmailList[P]>
  }




  export type EmailListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailListWhereInput
    orderBy?: EmailListOrderByWithAggregationInput | EmailListOrderByWithAggregationInput[]
    by: EmailListScalarFieldEnum[] | EmailListScalarFieldEnum
    having?: EmailListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailListCountAggregateInputType | true
    _min?: EmailListMinAggregateInputType
    _max?: EmailListMaxAggregateInputType
  }

  export type EmailListGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isDefault: boolean
    createdAt: Date
    clubId: string
    _count: EmailListCountAggregateOutputType | null
    _min: EmailListMinAggregateOutputType | null
    _max: EmailListMaxAggregateOutputType | null
  }

  type GetEmailListGroupByPayload<T extends EmailListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailListGroupByOutputType[P]>
            : GetScalarType<T[P], EmailListGroupByOutputType[P]>
        }
      >
    >


  export type EmailListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    clubId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
    memberships?: boolean | EmailList$membershipsArgs<ExtArgs>
    campaigns?: boolean | EmailList$campaignsArgs<ExtArgs>
    _count?: boolean | EmailListCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailList"]>

  export type EmailListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    clubId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailList"]>

  export type EmailListSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    clubId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailList"]>

  export type EmailListSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    clubId?: boolean
  }

  export type EmailListOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isDefault" | "createdAt" | "clubId", ExtArgs["result"]["emailList"]>
  export type EmailListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
    memberships?: boolean | EmailList$membershipsArgs<ExtArgs>
    campaigns?: boolean | EmailList$campaignsArgs<ExtArgs>
    _count?: boolean | EmailListCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmailListIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type EmailListIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }

  export type $EmailListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailList"
    objects: {
      club: Prisma.$ClubPayload<ExtArgs>
      memberships: Prisma.$SubscriberListMembershipPayload<ExtArgs>[]
      campaigns: Prisma.$CampaignPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isDefault: boolean
      createdAt: Date
      clubId: string
    }, ExtArgs["result"]["emailList"]>
    composites: {}
  }

  type EmailListGetPayload<S extends boolean | null | undefined | EmailListDefaultArgs> = $Result.GetResult<Prisma.$EmailListPayload, S>

  type EmailListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailListCountAggregateInputType | true
    }

  export interface EmailListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailList'], meta: { name: 'EmailList' } }
    /**
     * Find zero or one EmailList that matches the filter.
     * @param {EmailListFindUniqueArgs} args - Arguments to find a EmailList
     * @example
     * // Get one EmailList
     * const emailList = await prisma.emailList.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailListFindUniqueArgs>(args: SelectSubset<T, EmailListFindUniqueArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailList that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailListFindUniqueOrThrowArgs} args - Arguments to find a EmailList
     * @example
     * // Get one EmailList
     * const emailList = await prisma.emailList.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailListFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailList that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailListFindFirstArgs} args - Arguments to find a EmailList
     * @example
     * // Get one EmailList
     * const emailList = await prisma.emailList.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailListFindFirstArgs>(args?: SelectSubset<T, EmailListFindFirstArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailList that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailListFindFirstOrThrowArgs} args - Arguments to find a EmailList
     * @example
     * // Get one EmailList
     * const emailList = await prisma.emailList.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailListFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailListFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailLists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailLists
     * const emailLists = await prisma.emailList.findMany()
     * 
     * // Get first 10 EmailLists
     * const emailLists = await prisma.emailList.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailListWithIdOnly = await prisma.emailList.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailListFindManyArgs>(args?: SelectSubset<T, EmailListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailList.
     * @param {EmailListCreateArgs} args - Arguments to create a EmailList.
     * @example
     * // Create one EmailList
     * const EmailList = await prisma.emailList.create({
     *   data: {
     *     // ... data to create a EmailList
     *   }
     * })
     * 
     */
    create<T extends EmailListCreateArgs>(args: SelectSubset<T, EmailListCreateArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailLists.
     * @param {EmailListCreateManyArgs} args - Arguments to create many EmailLists.
     * @example
     * // Create many EmailLists
     * const emailList = await prisma.emailList.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailListCreateManyArgs>(args?: SelectSubset<T, EmailListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailLists and returns the data saved in the database.
     * @param {EmailListCreateManyAndReturnArgs} args - Arguments to create many EmailLists.
     * @example
     * // Create many EmailLists
     * const emailList = await prisma.emailList.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailLists and only return the `id`
     * const emailListWithIdOnly = await prisma.emailList.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailListCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailList.
     * @param {EmailListDeleteArgs} args - Arguments to delete one EmailList.
     * @example
     * // Delete one EmailList
     * const EmailList = await prisma.emailList.delete({
     *   where: {
     *     // ... filter to delete one EmailList
     *   }
     * })
     * 
     */
    delete<T extends EmailListDeleteArgs>(args: SelectSubset<T, EmailListDeleteArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailList.
     * @param {EmailListUpdateArgs} args - Arguments to update one EmailList.
     * @example
     * // Update one EmailList
     * const emailList = await prisma.emailList.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailListUpdateArgs>(args: SelectSubset<T, EmailListUpdateArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailLists.
     * @param {EmailListDeleteManyArgs} args - Arguments to filter EmailLists to delete.
     * @example
     * // Delete a few EmailLists
     * const { count } = await prisma.emailList.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailListDeleteManyArgs>(args?: SelectSubset<T, EmailListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailLists
     * const emailList = await prisma.emailList.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailListUpdateManyArgs>(args: SelectSubset<T, EmailListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailLists and returns the data updated in the database.
     * @param {EmailListUpdateManyAndReturnArgs} args - Arguments to update many EmailLists.
     * @example
     * // Update many EmailLists
     * const emailList = await prisma.emailList.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailLists and only return the `id`
     * const emailListWithIdOnly = await prisma.emailList.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmailListUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailList.
     * @param {EmailListUpsertArgs} args - Arguments to update or create a EmailList.
     * @example
     * // Update or create a EmailList
     * const emailList = await prisma.emailList.upsert({
     *   create: {
     *     // ... data to create a EmailList
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailList we want to update
     *   }
     * })
     */
    upsert<T extends EmailListUpsertArgs>(args: SelectSubset<T, EmailListUpsertArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailListCountArgs} args - Arguments to filter EmailLists to count.
     * @example
     * // Count the number of EmailLists
     * const count = await prisma.emailList.count({
     *   where: {
     *     // ... the filter for the EmailLists we want to count
     *   }
     * })
    **/
    count<T extends EmailListCountArgs>(
      args?: Subset<T, EmailListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmailListAggregateArgs>(args: Subset<T, EmailListAggregateArgs>): Prisma.PrismaPromise<GetEmailListAggregateType<T>>

    /**
     * Group by EmailList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailListGroupByArgs} args - Group by arguments.
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
      T extends EmailListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailListGroupByArgs['orderBy'] }
        : { orderBy?: EmailListGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmailListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailList model
   */
  readonly fields: EmailListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailList.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClubDefaultArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    memberships<T extends EmailList$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, EmailList$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaigns<T extends EmailList$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, EmailList$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the EmailList model
   */
  interface EmailListFieldRefs {
    readonly id: FieldRef<"EmailList", 'String'>
    readonly name: FieldRef<"EmailList", 'String'>
    readonly description: FieldRef<"EmailList", 'String'>
    readonly isDefault: FieldRef<"EmailList", 'Boolean'>
    readonly createdAt: FieldRef<"EmailList", 'DateTime'>
    readonly clubId: FieldRef<"EmailList", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EmailList findUnique
   */
  export type EmailListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    /**
     * Filter, which EmailList to fetch.
     */
    where: EmailListWhereUniqueInput
  }

  /**
   * EmailList findUniqueOrThrow
   */
  export type EmailListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    /**
     * Filter, which EmailList to fetch.
     */
    where: EmailListWhereUniqueInput
  }

  /**
   * EmailList findFirst
   */
  export type EmailListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    /**
     * Filter, which EmailList to fetch.
     */
    where?: EmailListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailLists to fetch.
     */
    orderBy?: EmailListOrderByWithRelationInput | EmailListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailLists.
     */
    cursor?: EmailListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailLists.
     */
    distinct?: EmailListScalarFieldEnum | EmailListScalarFieldEnum[]
  }

  /**
   * EmailList findFirstOrThrow
   */
  export type EmailListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    /**
     * Filter, which EmailList to fetch.
     */
    where?: EmailListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailLists to fetch.
     */
    orderBy?: EmailListOrderByWithRelationInput | EmailListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailLists.
     */
    cursor?: EmailListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailLists.
     */
    distinct?: EmailListScalarFieldEnum | EmailListScalarFieldEnum[]
  }

  /**
   * EmailList findMany
   */
  export type EmailListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    /**
     * Filter, which EmailLists to fetch.
     */
    where?: EmailListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailLists to fetch.
     */
    orderBy?: EmailListOrderByWithRelationInput | EmailListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailLists.
     */
    cursor?: EmailListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailLists.
     */
    skip?: number
    distinct?: EmailListScalarFieldEnum | EmailListScalarFieldEnum[]
  }

  /**
   * EmailList create
   */
  export type EmailListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailList.
     */
    data: XOR<EmailListCreateInput, EmailListUncheckedCreateInput>
  }

  /**
   * EmailList createMany
   */
  export type EmailListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailLists.
     */
    data: EmailListCreateManyInput | EmailListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailList createManyAndReturn
   */
  export type EmailListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * The data used to create many EmailLists.
     */
    data: EmailListCreateManyInput | EmailListCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailList update
   */
  export type EmailListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailList.
     */
    data: XOR<EmailListUpdateInput, EmailListUncheckedUpdateInput>
    /**
     * Choose, which EmailList to update.
     */
    where: EmailListWhereUniqueInput
  }

  /**
   * EmailList updateMany
   */
  export type EmailListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailLists.
     */
    data: XOR<EmailListUpdateManyMutationInput, EmailListUncheckedUpdateManyInput>
    /**
     * Filter which EmailLists to update
     */
    where?: EmailListWhereInput
    /**
     * Limit how many EmailLists to update.
     */
    limit?: number
  }

  /**
   * EmailList updateManyAndReturn
   */
  export type EmailListUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * The data used to update EmailLists.
     */
    data: XOR<EmailListUpdateManyMutationInput, EmailListUncheckedUpdateManyInput>
    /**
     * Filter which EmailLists to update
     */
    where?: EmailListWhereInput
    /**
     * Limit how many EmailLists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailList upsert
   */
  export type EmailListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailList to update in case it exists.
     */
    where: EmailListWhereUniqueInput
    /**
     * In case the EmailList found by the `where` argument doesn't exist, create a new EmailList with this data.
     */
    create: XOR<EmailListCreateInput, EmailListUncheckedCreateInput>
    /**
     * In case the EmailList was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailListUpdateInput, EmailListUncheckedUpdateInput>
  }

  /**
   * EmailList delete
   */
  export type EmailListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
    /**
     * Filter which EmailList to delete.
     */
    where: EmailListWhereUniqueInput
  }

  /**
   * EmailList deleteMany
   */
  export type EmailListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailLists to delete
     */
    where?: EmailListWhereInput
    /**
     * Limit how many EmailLists to delete.
     */
    limit?: number
  }

  /**
   * EmailList.memberships
   */
  export type EmailList$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    where?: SubscriberListMembershipWhereInput
    orderBy?: SubscriberListMembershipOrderByWithRelationInput | SubscriberListMembershipOrderByWithRelationInput[]
    cursor?: SubscriberListMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriberListMembershipScalarFieldEnum | SubscriberListMembershipScalarFieldEnum[]
  }

  /**
   * EmailList.campaigns
   */
  export type EmailList$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * EmailList without action
   */
  export type EmailListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailList
     */
    select?: EmailListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailList
     */
    omit?: EmailListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailListInclude<ExtArgs> | null
  }


  /**
   * Model Subscriber
   */

  export type AggregateSubscriber = {
    _count: SubscriberCountAggregateOutputType | null
    _min: SubscriberMinAggregateOutputType | null
    _max: SubscriberMaxAggregateOutputType | null
  }

  export type SubscriberMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    status: $Enums.SubscriberStatus | null
    unsubscribeToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clubId: string | null
  }

  export type SubscriberMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    status: $Enums.SubscriberStatus | null
    unsubscribeToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clubId: string | null
  }

  export type SubscriberCountAggregateOutputType = {
    id: number
    email: number
    name: number
    status: number
    unsubscribeToken: number
    createdAt: number
    updatedAt: number
    clubId: number
    _all: number
  }


  export type SubscriberMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    status?: true
    unsubscribeToken?: true
    createdAt?: true
    updatedAt?: true
    clubId?: true
  }

  export type SubscriberMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    status?: true
    unsubscribeToken?: true
    createdAt?: true
    updatedAt?: true
    clubId?: true
  }

  export type SubscriberCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    status?: true
    unsubscribeToken?: true
    createdAt?: true
    updatedAt?: true
    clubId?: true
    _all?: true
  }

  export type SubscriberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriber to aggregate.
     */
    where?: SubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscriberOrderByWithRelationInput | SubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscribers
    **/
    _count?: true | SubscriberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriberMaxAggregateInputType
  }

  export type GetSubscriberAggregateType<T extends SubscriberAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriber[P]>
      : GetScalarType<T[P], AggregateSubscriber[P]>
  }




  export type SubscriberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriberWhereInput
    orderBy?: SubscriberOrderByWithAggregationInput | SubscriberOrderByWithAggregationInput[]
    by: SubscriberScalarFieldEnum[] | SubscriberScalarFieldEnum
    having?: SubscriberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriberCountAggregateInputType | true
    _min?: SubscriberMinAggregateInputType
    _max?: SubscriberMaxAggregateInputType
  }

  export type SubscriberGroupByOutputType = {
    id: string
    email: string
    name: string | null
    status: $Enums.SubscriberStatus
    unsubscribeToken: string
    createdAt: Date
    updatedAt: Date
    clubId: string
    _count: SubscriberCountAggregateOutputType | null
    _min: SubscriberMinAggregateOutputType | null
    _max: SubscriberMaxAggregateOutputType | null
  }

  type GetSubscriberGroupByPayload<T extends SubscriberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriberGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriberGroupByOutputType[P]>
        }
      >
    >


  export type SubscriberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    status?: boolean
    unsubscribeToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clubId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
    listMemberships?: boolean | Subscriber$listMembershipsArgs<ExtArgs>
    emailEvents?: boolean | Subscriber$emailEventsArgs<ExtArgs>
    _count?: boolean | SubscriberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriber"]>

  export type SubscriberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    status?: boolean
    unsubscribeToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clubId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriber"]>

  export type SubscriberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    status?: boolean
    unsubscribeToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clubId?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriber"]>

  export type SubscriberSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    status?: boolean
    unsubscribeToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clubId?: boolean
  }

  export type SubscriberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "status" | "unsubscribeToken" | "createdAt" | "updatedAt" | "clubId", ExtArgs["result"]["subscriber"]>
  export type SubscriberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
    listMemberships?: boolean | Subscriber$listMembershipsArgs<ExtArgs>
    emailEvents?: boolean | Subscriber$emailEventsArgs<ExtArgs>
    _count?: boolean | SubscriberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubscriberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type SubscriberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }

  export type $SubscriberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscriber"
    objects: {
      club: Prisma.$ClubPayload<ExtArgs>
      listMemberships: Prisma.$SubscriberListMembershipPayload<ExtArgs>[]
      emailEvents: Prisma.$EmailEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      status: $Enums.SubscriberStatus
      unsubscribeToken: string
      createdAt: Date
      updatedAt: Date
      clubId: string
    }, ExtArgs["result"]["subscriber"]>
    composites: {}
  }

  type SubscriberGetPayload<S extends boolean | null | undefined | SubscriberDefaultArgs> = $Result.GetResult<Prisma.$SubscriberPayload, S>

  type SubscriberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriberCountAggregateInputType | true
    }

  export interface SubscriberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscriber'], meta: { name: 'Subscriber' } }
    /**
     * Find zero or one Subscriber that matches the filter.
     * @param {SubscriberFindUniqueArgs} args - Arguments to find a Subscriber
     * @example
     * // Get one Subscriber
     * const subscriber = await prisma.subscriber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriberFindUniqueArgs>(args: SelectSubset<T, SubscriberFindUniqueArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscriber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriberFindUniqueOrThrowArgs} args - Arguments to find a Subscriber
     * @example
     * // Get one Subscriber
     * const subscriber = await prisma.subscriber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriberFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberFindFirstArgs} args - Arguments to find a Subscriber
     * @example
     * // Get one Subscriber
     * const subscriber = await prisma.subscriber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriberFindFirstArgs>(args?: SelectSubset<T, SubscriberFindFirstArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberFindFirstOrThrowArgs} args - Arguments to find a Subscriber
     * @example
     * // Get one Subscriber
     * const subscriber = await prisma.subscriber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriberFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriberFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscribers
     * const subscribers = await prisma.subscriber.findMany()
     * 
     * // Get first 10 Subscribers
     * const subscribers = await prisma.subscriber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriberWithIdOnly = await prisma.subscriber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriberFindManyArgs>(args?: SelectSubset<T, SubscriberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscriber.
     * @param {SubscriberCreateArgs} args - Arguments to create a Subscriber.
     * @example
     * // Create one Subscriber
     * const Subscriber = await prisma.subscriber.create({
     *   data: {
     *     // ... data to create a Subscriber
     *   }
     * })
     * 
     */
    create<T extends SubscriberCreateArgs>(args: SelectSubset<T, SubscriberCreateArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscribers.
     * @param {SubscriberCreateManyArgs} args - Arguments to create many Subscribers.
     * @example
     * // Create many Subscribers
     * const subscriber = await prisma.subscriber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriberCreateManyArgs>(args?: SelectSubset<T, SubscriberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscribers and returns the data saved in the database.
     * @param {SubscriberCreateManyAndReturnArgs} args - Arguments to create many Subscribers.
     * @example
     * // Create many Subscribers
     * const subscriber = await prisma.subscriber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscribers and only return the `id`
     * const subscriberWithIdOnly = await prisma.subscriber.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriberCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscriber.
     * @param {SubscriberDeleteArgs} args - Arguments to delete one Subscriber.
     * @example
     * // Delete one Subscriber
     * const Subscriber = await prisma.subscriber.delete({
     *   where: {
     *     // ... filter to delete one Subscriber
     *   }
     * })
     * 
     */
    delete<T extends SubscriberDeleteArgs>(args: SelectSubset<T, SubscriberDeleteArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscriber.
     * @param {SubscriberUpdateArgs} args - Arguments to update one Subscriber.
     * @example
     * // Update one Subscriber
     * const subscriber = await prisma.subscriber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriberUpdateArgs>(args: SelectSubset<T, SubscriberUpdateArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscribers.
     * @param {SubscriberDeleteManyArgs} args - Arguments to filter Subscribers to delete.
     * @example
     * // Delete a few Subscribers
     * const { count } = await prisma.subscriber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriberDeleteManyArgs>(args?: SelectSubset<T, SubscriberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscribers
     * const subscriber = await prisma.subscriber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriberUpdateManyArgs>(args: SelectSubset<T, SubscriberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscribers and returns the data updated in the database.
     * @param {SubscriberUpdateManyAndReturnArgs} args - Arguments to update many Subscribers.
     * @example
     * // Update many Subscribers
     * const subscriber = await prisma.subscriber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscribers and only return the `id`
     * const subscriberWithIdOnly = await prisma.subscriber.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubscriberUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscriber.
     * @param {SubscriberUpsertArgs} args - Arguments to update or create a Subscriber.
     * @example
     * // Update or create a Subscriber
     * const subscriber = await prisma.subscriber.upsert({
     *   create: {
     *     // ... data to create a Subscriber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscriber we want to update
     *   }
     * })
     */
    upsert<T extends SubscriberUpsertArgs>(args: SelectSubset<T, SubscriberUpsertArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberCountArgs} args - Arguments to filter Subscribers to count.
     * @example
     * // Count the number of Subscribers
     * const count = await prisma.subscriber.count({
     *   where: {
     *     // ... the filter for the Subscribers we want to count
     *   }
     * })
    **/
    count<T extends SubscriberCountArgs>(
      args?: Subset<T, SubscriberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubscriberAggregateArgs>(args: Subset<T, SubscriberAggregateArgs>): Prisma.PrismaPromise<GetSubscriberAggregateType<T>>

    /**
     * Group by Subscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberGroupByArgs} args - Group by arguments.
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
      T extends SubscriberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriberGroupByArgs['orderBy'] }
        : { orderBy?: SubscriberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubscriberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscriber model
   */
  readonly fields: SubscriberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscriber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClubDefaultArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listMemberships<T extends Subscriber$listMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, Subscriber$listMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emailEvents<T extends Subscriber$emailEventsArgs<ExtArgs> = {}>(args?: Subset<T, Subscriber$emailEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Subscriber model
   */
  interface SubscriberFieldRefs {
    readonly id: FieldRef<"Subscriber", 'String'>
    readonly email: FieldRef<"Subscriber", 'String'>
    readonly name: FieldRef<"Subscriber", 'String'>
    readonly status: FieldRef<"Subscriber", 'SubscriberStatus'>
    readonly unsubscribeToken: FieldRef<"Subscriber", 'String'>
    readonly createdAt: FieldRef<"Subscriber", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscriber", 'DateTime'>
    readonly clubId: FieldRef<"Subscriber", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subscriber findUnique
   */
  export type SubscriberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    /**
     * Filter, which Subscriber to fetch.
     */
    where: SubscriberWhereUniqueInput
  }

  /**
   * Subscriber findUniqueOrThrow
   */
  export type SubscriberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    /**
     * Filter, which Subscriber to fetch.
     */
    where: SubscriberWhereUniqueInput
  }

  /**
   * Subscriber findFirst
   */
  export type SubscriberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    /**
     * Filter, which Subscriber to fetch.
     */
    where?: SubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscriberOrderByWithRelationInput | SubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscribers.
     */
    cursor?: SubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscribers.
     */
    distinct?: SubscriberScalarFieldEnum | SubscriberScalarFieldEnum[]
  }

  /**
   * Subscriber findFirstOrThrow
   */
  export type SubscriberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    /**
     * Filter, which Subscriber to fetch.
     */
    where?: SubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscriberOrderByWithRelationInput | SubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscribers.
     */
    cursor?: SubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscribers.
     */
    distinct?: SubscriberScalarFieldEnum | SubscriberScalarFieldEnum[]
  }

  /**
   * Subscriber findMany
   */
  export type SubscriberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    /**
     * Filter, which Subscribers to fetch.
     */
    where?: SubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscriberOrderByWithRelationInput | SubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscribers.
     */
    cursor?: SubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    distinct?: SubscriberScalarFieldEnum | SubscriberScalarFieldEnum[]
  }

  /**
   * Subscriber create
   */
  export type SubscriberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscriber.
     */
    data: XOR<SubscriberCreateInput, SubscriberUncheckedCreateInput>
  }

  /**
   * Subscriber createMany
   */
  export type SubscriberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscribers.
     */
    data: SubscriberCreateManyInput | SubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscriber createManyAndReturn
   */
  export type SubscriberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * The data used to create many Subscribers.
     */
    data: SubscriberCreateManyInput | SubscriberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscriber update
   */
  export type SubscriberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscriber.
     */
    data: XOR<SubscriberUpdateInput, SubscriberUncheckedUpdateInput>
    /**
     * Choose, which Subscriber to update.
     */
    where: SubscriberWhereUniqueInput
  }

  /**
   * Subscriber updateMany
   */
  export type SubscriberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscribers.
     */
    data: XOR<SubscriberUpdateManyMutationInput, SubscriberUncheckedUpdateManyInput>
    /**
     * Filter which Subscribers to update
     */
    where?: SubscriberWhereInput
    /**
     * Limit how many Subscribers to update.
     */
    limit?: number
  }

  /**
   * Subscriber updateManyAndReturn
   */
  export type SubscriberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * The data used to update Subscribers.
     */
    data: XOR<SubscriberUpdateManyMutationInput, SubscriberUncheckedUpdateManyInput>
    /**
     * Filter which Subscribers to update
     */
    where?: SubscriberWhereInput
    /**
     * Limit how many Subscribers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscriber upsert
   */
  export type SubscriberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscriber to update in case it exists.
     */
    where: SubscriberWhereUniqueInput
    /**
     * In case the Subscriber found by the `where` argument doesn't exist, create a new Subscriber with this data.
     */
    create: XOR<SubscriberCreateInput, SubscriberUncheckedCreateInput>
    /**
     * In case the Subscriber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriberUpdateInput, SubscriberUncheckedUpdateInput>
  }

  /**
   * Subscriber delete
   */
  export type SubscriberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
    /**
     * Filter which Subscriber to delete.
     */
    where: SubscriberWhereUniqueInput
  }

  /**
   * Subscriber deleteMany
   */
  export type SubscriberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscribers to delete
     */
    where?: SubscriberWhereInput
    /**
     * Limit how many Subscribers to delete.
     */
    limit?: number
  }

  /**
   * Subscriber.listMemberships
   */
  export type Subscriber$listMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    where?: SubscriberListMembershipWhereInput
    orderBy?: SubscriberListMembershipOrderByWithRelationInput | SubscriberListMembershipOrderByWithRelationInput[]
    cursor?: SubscriberListMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriberListMembershipScalarFieldEnum | SubscriberListMembershipScalarFieldEnum[]
  }

  /**
   * Subscriber.emailEvents
   */
  export type Subscriber$emailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    where?: EmailEventWhereInput
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    cursor?: EmailEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * Subscriber without action
   */
  export type SubscriberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberInclude<ExtArgs> | null
  }


  /**
   * Model SubscriberListMembership
   */

  export type AggregateSubscriberListMembership = {
    _count: SubscriberListMembershipCountAggregateOutputType | null
    _min: SubscriberListMembershipMinAggregateOutputType | null
    _max: SubscriberListMembershipMaxAggregateOutputType | null
  }

  export type SubscriberListMembershipMinAggregateOutputType = {
    subscribedAt: Date | null
    unsubscribedAt: Date | null
    subscriberId: string | null
    emailListId: string | null
  }

  export type SubscriberListMembershipMaxAggregateOutputType = {
    subscribedAt: Date | null
    unsubscribedAt: Date | null
    subscriberId: string | null
    emailListId: string | null
  }

  export type SubscriberListMembershipCountAggregateOutputType = {
    subscribedAt: number
    unsubscribedAt: number
    subscriberId: number
    emailListId: number
    _all: number
  }


  export type SubscriberListMembershipMinAggregateInputType = {
    subscribedAt?: true
    unsubscribedAt?: true
    subscriberId?: true
    emailListId?: true
  }

  export type SubscriberListMembershipMaxAggregateInputType = {
    subscribedAt?: true
    unsubscribedAt?: true
    subscriberId?: true
    emailListId?: true
  }

  export type SubscriberListMembershipCountAggregateInputType = {
    subscribedAt?: true
    unsubscribedAt?: true
    subscriberId?: true
    emailListId?: true
    _all?: true
  }

  export type SubscriberListMembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriberListMembership to aggregate.
     */
    where?: SubscriberListMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriberListMemberships to fetch.
     */
    orderBy?: SubscriberListMembershipOrderByWithRelationInput | SubscriberListMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriberListMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriberListMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriberListMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscriberListMemberships
    **/
    _count?: true | SubscriberListMembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriberListMembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriberListMembershipMaxAggregateInputType
  }

  export type GetSubscriberListMembershipAggregateType<T extends SubscriberListMembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriberListMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriberListMembership[P]>
      : GetScalarType<T[P], AggregateSubscriberListMembership[P]>
  }




  export type SubscriberListMembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriberListMembershipWhereInput
    orderBy?: SubscriberListMembershipOrderByWithAggregationInput | SubscriberListMembershipOrderByWithAggregationInput[]
    by: SubscriberListMembershipScalarFieldEnum[] | SubscriberListMembershipScalarFieldEnum
    having?: SubscriberListMembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriberListMembershipCountAggregateInputType | true
    _min?: SubscriberListMembershipMinAggregateInputType
    _max?: SubscriberListMembershipMaxAggregateInputType
  }

  export type SubscriberListMembershipGroupByOutputType = {
    subscribedAt: Date | null
    unsubscribedAt: Date | null
    subscriberId: string
    emailListId: string
    _count: SubscriberListMembershipCountAggregateOutputType | null
    _min: SubscriberListMembershipMinAggregateOutputType | null
    _max: SubscriberListMembershipMaxAggregateOutputType | null
  }

  type GetSubscriberListMembershipGroupByPayload<T extends SubscriberListMembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriberListMembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriberListMembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriberListMembershipGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriberListMembershipGroupByOutputType[P]>
        }
      >
    >


  export type SubscriberListMembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subscribedAt?: boolean
    unsubscribedAt?: boolean
    subscriberId?: boolean
    emailListId?: boolean
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriberListMembership"]>

  export type SubscriberListMembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subscribedAt?: boolean
    unsubscribedAt?: boolean
    subscriberId?: boolean
    emailListId?: boolean
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriberListMembership"]>

  export type SubscriberListMembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subscribedAt?: boolean
    unsubscribedAt?: boolean
    subscriberId?: boolean
    emailListId?: boolean
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriberListMembership"]>

  export type SubscriberListMembershipSelectScalar = {
    subscribedAt?: boolean
    unsubscribedAt?: boolean
    subscriberId?: boolean
    emailListId?: boolean
  }

  export type SubscriberListMembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"subscribedAt" | "unsubscribedAt" | "subscriberId" | "emailListId", ExtArgs["result"]["subscriberListMembership"]>
  export type SubscriberListMembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
  }
  export type SubscriberListMembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
  }
  export type SubscriberListMembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
  }

  export type $SubscriberListMembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubscriberListMembership"
    objects: {
      subscriber: Prisma.$SubscriberPayload<ExtArgs>
      emailList: Prisma.$EmailListPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      subscribedAt: Date | null
      unsubscribedAt: Date | null
      subscriberId: string
      emailListId: string
    }, ExtArgs["result"]["subscriberListMembership"]>
    composites: {}
  }

  type SubscriberListMembershipGetPayload<S extends boolean | null | undefined | SubscriberListMembershipDefaultArgs> = $Result.GetResult<Prisma.$SubscriberListMembershipPayload, S>

  type SubscriberListMembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriberListMembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriberListMembershipCountAggregateInputType | true
    }

  export interface SubscriberListMembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscriberListMembership'], meta: { name: 'SubscriberListMembership' } }
    /**
     * Find zero or one SubscriberListMembership that matches the filter.
     * @param {SubscriberListMembershipFindUniqueArgs} args - Arguments to find a SubscriberListMembership
     * @example
     * // Get one SubscriberListMembership
     * const subscriberListMembership = await prisma.subscriberListMembership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriberListMembershipFindUniqueArgs>(args: SelectSubset<T, SubscriberListMembershipFindUniqueArgs<ExtArgs>>): Prisma__SubscriberListMembershipClient<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubscriberListMembership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriberListMembershipFindUniqueOrThrowArgs} args - Arguments to find a SubscriberListMembership
     * @example
     * // Get one SubscriberListMembership
     * const subscriberListMembership = await prisma.subscriberListMembership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriberListMembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriberListMembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriberListMembershipClient<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriberListMembership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberListMembershipFindFirstArgs} args - Arguments to find a SubscriberListMembership
     * @example
     * // Get one SubscriberListMembership
     * const subscriberListMembership = await prisma.subscriberListMembership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriberListMembershipFindFirstArgs>(args?: SelectSubset<T, SubscriberListMembershipFindFirstArgs<ExtArgs>>): Prisma__SubscriberListMembershipClient<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriberListMembership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberListMembershipFindFirstOrThrowArgs} args - Arguments to find a SubscriberListMembership
     * @example
     * // Get one SubscriberListMembership
     * const subscriberListMembership = await prisma.subscriberListMembership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriberListMembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriberListMembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriberListMembershipClient<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubscriberListMemberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberListMembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscriberListMemberships
     * const subscriberListMemberships = await prisma.subscriberListMembership.findMany()
     * 
     * // Get first 10 SubscriberListMemberships
     * const subscriberListMemberships = await prisma.subscriberListMembership.findMany({ take: 10 })
     * 
     * // Only select the `subscribedAt`
     * const subscriberListMembershipWithSubscribedAtOnly = await prisma.subscriberListMembership.findMany({ select: { subscribedAt: true } })
     * 
     */
    findMany<T extends SubscriberListMembershipFindManyArgs>(args?: SelectSubset<T, SubscriberListMembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubscriberListMembership.
     * @param {SubscriberListMembershipCreateArgs} args - Arguments to create a SubscriberListMembership.
     * @example
     * // Create one SubscriberListMembership
     * const SubscriberListMembership = await prisma.subscriberListMembership.create({
     *   data: {
     *     // ... data to create a SubscriberListMembership
     *   }
     * })
     * 
     */
    create<T extends SubscriberListMembershipCreateArgs>(args: SelectSubset<T, SubscriberListMembershipCreateArgs<ExtArgs>>): Prisma__SubscriberListMembershipClient<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubscriberListMemberships.
     * @param {SubscriberListMembershipCreateManyArgs} args - Arguments to create many SubscriberListMemberships.
     * @example
     * // Create many SubscriberListMemberships
     * const subscriberListMembership = await prisma.subscriberListMembership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriberListMembershipCreateManyArgs>(args?: SelectSubset<T, SubscriberListMembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubscriberListMemberships and returns the data saved in the database.
     * @param {SubscriberListMembershipCreateManyAndReturnArgs} args - Arguments to create many SubscriberListMemberships.
     * @example
     * // Create many SubscriberListMemberships
     * const subscriberListMembership = await prisma.subscriberListMembership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubscriberListMemberships and only return the `subscribedAt`
     * const subscriberListMembershipWithSubscribedAtOnly = await prisma.subscriberListMembership.createManyAndReturn({
     *   select: { subscribedAt: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriberListMembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriberListMembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubscriberListMembership.
     * @param {SubscriberListMembershipDeleteArgs} args - Arguments to delete one SubscriberListMembership.
     * @example
     * // Delete one SubscriberListMembership
     * const SubscriberListMembership = await prisma.subscriberListMembership.delete({
     *   where: {
     *     // ... filter to delete one SubscriberListMembership
     *   }
     * })
     * 
     */
    delete<T extends SubscriberListMembershipDeleteArgs>(args: SelectSubset<T, SubscriberListMembershipDeleteArgs<ExtArgs>>): Prisma__SubscriberListMembershipClient<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubscriberListMembership.
     * @param {SubscriberListMembershipUpdateArgs} args - Arguments to update one SubscriberListMembership.
     * @example
     * // Update one SubscriberListMembership
     * const subscriberListMembership = await prisma.subscriberListMembership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriberListMembershipUpdateArgs>(args: SelectSubset<T, SubscriberListMembershipUpdateArgs<ExtArgs>>): Prisma__SubscriberListMembershipClient<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubscriberListMemberships.
     * @param {SubscriberListMembershipDeleteManyArgs} args - Arguments to filter SubscriberListMemberships to delete.
     * @example
     * // Delete a few SubscriberListMemberships
     * const { count } = await prisma.subscriberListMembership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriberListMembershipDeleteManyArgs>(args?: SelectSubset<T, SubscriberListMembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriberListMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberListMembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscriberListMemberships
     * const subscriberListMembership = await prisma.subscriberListMembership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriberListMembershipUpdateManyArgs>(args: SelectSubset<T, SubscriberListMembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriberListMemberships and returns the data updated in the database.
     * @param {SubscriberListMembershipUpdateManyAndReturnArgs} args - Arguments to update many SubscriberListMemberships.
     * @example
     * // Update many SubscriberListMemberships
     * const subscriberListMembership = await prisma.subscriberListMembership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubscriberListMemberships and only return the `subscribedAt`
     * const subscriberListMembershipWithSubscribedAtOnly = await prisma.subscriberListMembership.updateManyAndReturn({
     *   select: { subscribedAt: true },
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
    updateManyAndReturn<T extends SubscriberListMembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriberListMembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubscriberListMembership.
     * @param {SubscriberListMembershipUpsertArgs} args - Arguments to update or create a SubscriberListMembership.
     * @example
     * // Update or create a SubscriberListMembership
     * const subscriberListMembership = await prisma.subscriberListMembership.upsert({
     *   create: {
     *     // ... data to create a SubscriberListMembership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscriberListMembership we want to update
     *   }
     * })
     */
    upsert<T extends SubscriberListMembershipUpsertArgs>(args: SelectSubset<T, SubscriberListMembershipUpsertArgs<ExtArgs>>): Prisma__SubscriberListMembershipClient<$Result.GetResult<Prisma.$SubscriberListMembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubscriberListMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberListMembershipCountArgs} args - Arguments to filter SubscriberListMemberships to count.
     * @example
     * // Count the number of SubscriberListMemberships
     * const count = await prisma.subscriberListMembership.count({
     *   where: {
     *     // ... the filter for the SubscriberListMemberships we want to count
     *   }
     * })
    **/
    count<T extends SubscriberListMembershipCountArgs>(
      args?: Subset<T, SubscriberListMembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriberListMembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscriberListMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberListMembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubscriberListMembershipAggregateArgs>(args: Subset<T, SubscriberListMembershipAggregateArgs>): Prisma.PrismaPromise<GetSubscriberListMembershipAggregateType<T>>

    /**
     * Group by SubscriberListMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberListMembershipGroupByArgs} args - Group by arguments.
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
      T extends SubscriberListMembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriberListMembershipGroupByArgs['orderBy'] }
        : { orderBy?: SubscriberListMembershipGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubscriberListMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriberListMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscriberListMembership model
   */
  readonly fields: SubscriberListMembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscriberListMembership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriberListMembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriber<T extends SubscriberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubscriberDefaultArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    emailList<T extends EmailListDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmailListDefaultArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SubscriberListMembership model
   */
  interface SubscriberListMembershipFieldRefs {
    readonly subscribedAt: FieldRef<"SubscriberListMembership", 'DateTime'>
    readonly unsubscribedAt: FieldRef<"SubscriberListMembership", 'DateTime'>
    readonly subscriberId: FieldRef<"SubscriberListMembership", 'String'>
    readonly emailListId: FieldRef<"SubscriberListMembership", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SubscriberListMembership findUnique
   */
  export type SubscriberListMembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberListMembership to fetch.
     */
    where: SubscriberListMembershipWhereUniqueInput
  }

  /**
   * SubscriberListMembership findUniqueOrThrow
   */
  export type SubscriberListMembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberListMembership to fetch.
     */
    where: SubscriberListMembershipWhereUniqueInput
  }

  /**
   * SubscriberListMembership findFirst
   */
  export type SubscriberListMembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberListMembership to fetch.
     */
    where?: SubscriberListMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriberListMemberships to fetch.
     */
    orderBy?: SubscriberListMembershipOrderByWithRelationInput | SubscriberListMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriberListMemberships.
     */
    cursor?: SubscriberListMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriberListMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriberListMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriberListMemberships.
     */
    distinct?: SubscriberListMembershipScalarFieldEnum | SubscriberListMembershipScalarFieldEnum[]
  }

  /**
   * SubscriberListMembership findFirstOrThrow
   */
  export type SubscriberListMembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberListMembership to fetch.
     */
    where?: SubscriberListMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriberListMemberships to fetch.
     */
    orderBy?: SubscriberListMembershipOrderByWithRelationInput | SubscriberListMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriberListMemberships.
     */
    cursor?: SubscriberListMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriberListMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriberListMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriberListMemberships.
     */
    distinct?: SubscriberListMembershipScalarFieldEnum | SubscriberListMembershipScalarFieldEnum[]
  }

  /**
   * SubscriberListMembership findMany
   */
  export type SubscriberListMembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberListMemberships to fetch.
     */
    where?: SubscriberListMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriberListMemberships to fetch.
     */
    orderBy?: SubscriberListMembershipOrderByWithRelationInput | SubscriberListMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscriberListMemberships.
     */
    cursor?: SubscriberListMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriberListMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriberListMemberships.
     */
    skip?: number
    distinct?: SubscriberListMembershipScalarFieldEnum | SubscriberListMembershipScalarFieldEnum[]
  }

  /**
   * SubscriberListMembership create
   */
  export type SubscriberListMembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a SubscriberListMembership.
     */
    data: XOR<SubscriberListMembershipCreateInput, SubscriberListMembershipUncheckedCreateInput>
  }

  /**
   * SubscriberListMembership createMany
   */
  export type SubscriberListMembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscriberListMemberships.
     */
    data: SubscriberListMembershipCreateManyInput | SubscriberListMembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubscriberListMembership createManyAndReturn
   */
  export type SubscriberListMembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * The data used to create many SubscriberListMemberships.
     */
    data: SubscriberListMembershipCreateManyInput | SubscriberListMembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscriberListMembership update
   */
  export type SubscriberListMembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a SubscriberListMembership.
     */
    data: XOR<SubscriberListMembershipUpdateInput, SubscriberListMembershipUncheckedUpdateInput>
    /**
     * Choose, which SubscriberListMembership to update.
     */
    where: SubscriberListMembershipWhereUniqueInput
  }

  /**
   * SubscriberListMembership updateMany
   */
  export type SubscriberListMembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscriberListMemberships.
     */
    data: XOR<SubscriberListMembershipUpdateManyMutationInput, SubscriberListMembershipUncheckedUpdateManyInput>
    /**
     * Filter which SubscriberListMemberships to update
     */
    where?: SubscriberListMembershipWhereInput
    /**
     * Limit how many SubscriberListMemberships to update.
     */
    limit?: number
  }

  /**
   * SubscriberListMembership updateManyAndReturn
   */
  export type SubscriberListMembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * The data used to update SubscriberListMemberships.
     */
    data: XOR<SubscriberListMembershipUpdateManyMutationInput, SubscriberListMembershipUncheckedUpdateManyInput>
    /**
     * Filter which SubscriberListMemberships to update
     */
    where?: SubscriberListMembershipWhereInput
    /**
     * Limit how many SubscriberListMemberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscriberListMembership upsert
   */
  export type SubscriberListMembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the SubscriberListMembership to update in case it exists.
     */
    where: SubscriberListMembershipWhereUniqueInput
    /**
     * In case the SubscriberListMembership found by the `where` argument doesn't exist, create a new SubscriberListMembership with this data.
     */
    create: XOR<SubscriberListMembershipCreateInput, SubscriberListMembershipUncheckedCreateInput>
    /**
     * In case the SubscriberListMembership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriberListMembershipUpdateInput, SubscriberListMembershipUncheckedUpdateInput>
  }

  /**
   * SubscriberListMembership delete
   */
  export type SubscriberListMembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
    /**
     * Filter which SubscriberListMembership to delete.
     */
    where: SubscriberListMembershipWhereUniqueInput
  }

  /**
   * SubscriberListMembership deleteMany
   */
  export type SubscriberListMembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriberListMemberships to delete
     */
    where?: SubscriberListMembershipWhereInput
    /**
     * Limit how many SubscriberListMemberships to delete.
     */
    limit?: number
  }

  /**
   * SubscriberListMembership without action
   */
  export type SubscriberListMembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberListMembership
     */
    select?: SubscriberListMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriberListMembership
     */
    omit?: SubscriberListMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriberListMembershipInclude<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    name: string | null
    subject: string | null
    preheaderText: string | null
    fromName: string | null
    fromEmail: string | null
    designJson: string | null
    html: string | null
    status: $Enums.CampaignStatus | null
    scheduledAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    clubId: string | null
    emailListId: string | null
    createdById: string | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    name: string | null
    subject: string | null
    preheaderText: string | null
    fromName: string | null
    fromEmail: string | null
    designJson: string | null
    html: string | null
    status: $Enums.CampaignStatus | null
    scheduledAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    clubId: string | null
    emailListId: string | null
    createdById: string | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    name: number
    subject: number
    preheaderText: number
    fromName: number
    fromEmail: number
    designJson: number
    html: number
    status: number
    scheduledAt: number
    startedAt: number
    finishedAt: number
    createdAt: number
    updatedAt: number
    clubId: number
    emailListId: number
    createdById: number
    _all: number
  }


  export type CampaignMinAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    preheaderText?: true
    fromName?: true
    fromEmail?: true
    designJson?: true
    html?: true
    status?: true
    scheduledAt?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
    updatedAt?: true
    clubId?: true
    emailListId?: true
    createdById?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    preheaderText?: true
    fromName?: true
    fromEmail?: true
    designJson?: true
    html?: true
    status?: true
    scheduledAt?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
    updatedAt?: true
    clubId?: true
    emailListId?: true
    createdById?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    preheaderText?: true
    fromName?: true
    fromEmail?: true
    designJson?: true
    html?: true
    status?: true
    scheduledAt?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
    updatedAt?: true
    clubId?: true
    emailListId?: true
    createdById?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    name: string
    subject: string
    preheaderText: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status: $Enums.CampaignStatus
    scheduledAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date
    updatedAt: Date
    clubId: string
    emailListId: string
    createdById: string
    _count: CampaignCountAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subject?: boolean
    preheaderText?: boolean
    fromName?: boolean
    fromEmail?: boolean
    designJson?: boolean
    html?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clubId?: boolean
    emailListId?: boolean
    createdById?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    emailEvents?: boolean | Campaign$emailEventsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subject?: boolean
    preheaderText?: boolean
    fromName?: boolean
    fromEmail?: boolean
    designJson?: boolean
    html?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clubId?: boolean
    emailListId?: boolean
    createdById?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subject?: boolean
    preheaderText?: boolean
    fromName?: boolean
    fromEmail?: boolean
    designJson?: boolean
    html?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clubId?: boolean
    emailListId?: boolean
    createdById?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectScalar = {
    id?: boolean
    name?: boolean
    subject?: boolean
    preheaderText?: boolean
    fromName?: boolean
    fromEmail?: boolean
    designJson?: boolean
    html?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clubId?: boolean
    emailListId?: boolean
    createdById?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "subject" | "preheaderText" | "fromName" | "fromEmail" | "designJson" | "html" | "status" | "scheduledAt" | "startedAt" | "finishedAt" | "createdAt" | "updatedAt" | "clubId" | "emailListId" | "createdById", ExtArgs["result"]["campaign"]>
  export type CampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    emailEvents?: boolean | Campaign$emailEventsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
    emailList?: boolean | EmailListDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {
      club: Prisma.$ClubPayload<ExtArgs>
      emailList: Prisma.$EmailListPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
      emailEvents: Prisma.$EmailEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      subject: string
      preheaderText: string | null
      fromName: string
      fromEmail: string
      designJson: string
      html: string
      status: $Enums.CampaignStatus
      scheduledAt: Date | null
      startedAt: Date | null
      finishedAt: Date | null
      createdAt: Date
      updatedAt: Date
      clubId: string
      emailListId: string
      createdById: string
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {CampaignCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {CampaignUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.updateManyAndReturn({
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
    updateManyAndReturn<T extends CampaignUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
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
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClubDefaultArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    emailList<T extends EmailListDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmailListDefaultArgs<ExtArgs>>): Prisma__EmailListClient<$Result.GetResult<Prisma.$EmailListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    emailEvents<T extends Campaign$emailEventsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$emailEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly name: FieldRef<"Campaign", 'String'>
    readonly subject: FieldRef<"Campaign", 'String'>
    readonly preheaderText: FieldRef<"Campaign", 'String'>
    readonly fromName: FieldRef<"Campaign", 'String'>
    readonly fromEmail: FieldRef<"Campaign", 'String'>
    readonly designJson: FieldRef<"Campaign", 'String'>
    readonly html: FieldRef<"Campaign", 'String'>
    readonly status: FieldRef<"Campaign", 'CampaignStatus'>
    readonly scheduledAt: FieldRef<"Campaign", 'DateTime'>
    readonly startedAt: FieldRef<"Campaign", 'DateTime'>
    readonly finishedAt: FieldRef<"Campaign", 'DateTime'>
    readonly createdAt: FieldRef<"Campaign", 'DateTime'>
    readonly updatedAt: FieldRef<"Campaign", 'DateTime'>
    readonly clubId: FieldRef<"Campaign", 'String'>
    readonly emailListId: FieldRef<"Campaign", 'String'>
    readonly createdById: FieldRef<"Campaign", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campaign createManyAndReturn
   */
  export type CampaignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign updateManyAndReturn
   */
  export type CampaignUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number
  }

  /**
   * Campaign.emailEvents
   */
  export type Campaign$emailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    where?: EmailEventWhereInput
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    cursor?: EmailEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
  }


  /**
   * Model EmailEvent
   */

  export type AggregateEmailEvent = {
    _count: EmailEventCountAggregateOutputType | null
    _min: EmailEventMinAggregateOutputType | null
    _max: EmailEventMaxAggregateOutputType | null
  }

  export type EmailEventMinAggregateOutputType = {
    id: string | null
    providerMessageId: string | null
    status: $Enums.EmailEventStatus | null
    errorMessage: string | null
    timestamp: Date | null
    campaignId: string | null
    subscriberId: string | null
  }

  export type EmailEventMaxAggregateOutputType = {
    id: string | null
    providerMessageId: string | null
    status: $Enums.EmailEventStatus | null
    errorMessage: string | null
    timestamp: Date | null
    campaignId: string | null
    subscriberId: string | null
  }

  export type EmailEventCountAggregateOutputType = {
    id: number
    providerMessageId: number
    status: number
    errorMessage: number
    timestamp: number
    campaignId: number
    subscriberId: number
    _all: number
  }


  export type EmailEventMinAggregateInputType = {
    id?: true
    providerMessageId?: true
    status?: true
    errorMessage?: true
    timestamp?: true
    campaignId?: true
    subscriberId?: true
  }

  export type EmailEventMaxAggregateInputType = {
    id?: true
    providerMessageId?: true
    status?: true
    errorMessage?: true
    timestamp?: true
    campaignId?: true
    subscriberId?: true
  }

  export type EmailEventCountAggregateInputType = {
    id?: true
    providerMessageId?: true
    status?: true
    errorMessage?: true
    timestamp?: true
    campaignId?: true
    subscriberId?: true
    _all?: true
  }

  export type EmailEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailEvent to aggregate.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailEvents
    **/
    _count?: true | EmailEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailEventMaxAggregateInputType
  }

  export type GetEmailEventAggregateType<T extends EmailEventAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailEvent[P]>
      : GetScalarType<T[P], AggregateEmailEvent[P]>
  }




  export type EmailEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailEventWhereInput
    orderBy?: EmailEventOrderByWithAggregationInput | EmailEventOrderByWithAggregationInput[]
    by: EmailEventScalarFieldEnum[] | EmailEventScalarFieldEnum
    having?: EmailEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailEventCountAggregateInputType | true
    _min?: EmailEventMinAggregateInputType
    _max?: EmailEventMaxAggregateInputType
  }

  export type EmailEventGroupByOutputType = {
    id: string
    providerMessageId: string | null
    status: $Enums.EmailEventStatus
    errorMessage: string | null
    timestamp: Date
    campaignId: string
    subscriberId: string
    _count: EmailEventCountAggregateOutputType | null
    _min: EmailEventMinAggregateOutputType | null
    _max: EmailEventMaxAggregateOutputType | null
  }

  type GetEmailEventGroupByPayload<T extends EmailEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailEventGroupByOutputType[P]>
            : GetScalarType<T[P], EmailEventGroupByOutputType[P]>
        }
      >
    >


  export type EmailEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    providerMessageId?: boolean
    status?: boolean
    errorMessage?: boolean
    timestamp?: boolean
    campaignId?: boolean
    subscriberId?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    providerMessageId?: boolean
    status?: boolean
    errorMessage?: boolean
    timestamp?: boolean
    campaignId?: boolean
    subscriberId?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    providerMessageId?: boolean
    status?: boolean
    errorMessage?: boolean
    timestamp?: boolean
    campaignId?: boolean
    subscriberId?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectScalar = {
    id?: boolean
    providerMessageId?: boolean
    status?: boolean
    errorMessage?: boolean
    timestamp?: boolean
    campaignId?: boolean
    subscriberId?: boolean
  }

  export type EmailEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "providerMessageId" | "status" | "errorMessage" | "timestamp" | "campaignId" | "subscriberId", ExtArgs["result"]["emailEvent"]>
  export type EmailEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
  }
  export type EmailEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
  }
  export type EmailEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    subscriber?: boolean | SubscriberDefaultArgs<ExtArgs>
  }

  export type $EmailEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailEvent"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      subscriber: Prisma.$SubscriberPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      providerMessageId: string | null
      status: $Enums.EmailEventStatus
      errorMessage: string | null
      timestamp: Date
      campaignId: string
      subscriberId: string
    }, ExtArgs["result"]["emailEvent"]>
    composites: {}
  }

  type EmailEventGetPayload<S extends boolean | null | undefined | EmailEventDefaultArgs> = $Result.GetResult<Prisma.$EmailEventPayload, S>

  type EmailEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailEventCountAggregateInputType | true
    }

  export interface EmailEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailEvent'], meta: { name: 'EmailEvent' } }
    /**
     * Find zero or one EmailEvent that matches the filter.
     * @param {EmailEventFindUniqueArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailEventFindUniqueArgs>(args: SelectSubset<T, EmailEventFindUniqueArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailEventFindUniqueOrThrowArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailEventFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventFindFirstArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailEventFindFirstArgs>(args?: SelectSubset<T, EmailEventFindFirstArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventFindFirstOrThrowArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailEventFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailEvents
     * const emailEvents = await prisma.emailEvent.findMany()
     * 
     * // Get first 10 EmailEvents
     * const emailEvents = await prisma.emailEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailEventWithIdOnly = await prisma.emailEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailEventFindManyArgs>(args?: SelectSubset<T, EmailEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailEvent.
     * @param {EmailEventCreateArgs} args - Arguments to create a EmailEvent.
     * @example
     * // Create one EmailEvent
     * const EmailEvent = await prisma.emailEvent.create({
     *   data: {
     *     // ... data to create a EmailEvent
     *   }
     * })
     * 
     */
    create<T extends EmailEventCreateArgs>(args: SelectSubset<T, EmailEventCreateArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailEvents.
     * @param {EmailEventCreateManyArgs} args - Arguments to create many EmailEvents.
     * @example
     * // Create many EmailEvents
     * const emailEvent = await prisma.emailEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailEventCreateManyArgs>(args?: SelectSubset<T, EmailEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailEvents and returns the data saved in the database.
     * @param {EmailEventCreateManyAndReturnArgs} args - Arguments to create many EmailEvents.
     * @example
     * // Create many EmailEvents
     * const emailEvent = await prisma.emailEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailEvents and only return the `id`
     * const emailEventWithIdOnly = await prisma.emailEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailEventCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailEvent.
     * @param {EmailEventDeleteArgs} args - Arguments to delete one EmailEvent.
     * @example
     * // Delete one EmailEvent
     * const EmailEvent = await prisma.emailEvent.delete({
     *   where: {
     *     // ... filter to delete one EmailEvent
     *   }
     * })
     * 
     */
    delete<T extends EmailEventDeleteArgs>(args: SelectSubset<T, EmailEventDeleteArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailEvent.
     * @param {EmailEventUpdateArgs} args - Arguments to update one EmailEvent.
     * @example
     * // Update one EmailEvent
     * const emailEvent = await prisma.emailEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailEventUpdateArgs>(args: SelectSubset<T, EmailEventUpdateArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailEvents.
     * @param {EmailEventDeleteManyArgs} args - Arguments to filter EmailEvents to delete.
     * @example
     * // Delete a few EmailEvents
     * const { count } = await prisma.emailEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailEventDeleteManyArgs>(args?: SelectSubset<T, EmailEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailEvents
     * const emailEvent = await prisma.emailEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailEventUpdateManyArgs>(args: SelectSubset<T, EmailEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailEvents and returns the data updated in the database.
     * @param {EmailEventUpdateManyAndReturnArgs} args - Arguments to update many EmailEvents.
     * @example
     * // Update many EmailEvents
     * const emailEvent = await prisma.emailEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailEvents and only return the `id`
     * const emailEventWithIdOnly = await prisma.emailEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmailEventUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailEvent.
     * @param {EmailEventUpsertArgs} args - Arguments to update or create a EmailEvent.
     * @example
     * // Update or create a EmailEvent
     * const emailEvent = await prisma.emailEvent.upsert({
     *   create: {
     *     // ... data to create a EmailEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailEvent we want to update
     *   }
     * })
     */
    upsert<T extends EmailEventUpsertArgs>(args: SelectSubset<T, EmailEventUpsertArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventCountArgs} args - Arguments to filter EmailEvents to count.
     * @example
     * // Count the number of EmailEvents
     * const count = await prisma.emailEvent.count({
     *   where: {
     *     // ... the filter for the EmailEvents we want to count
     *   }
     * })
    **/
    count<T extends EmailEventCountArgs>(
      args?: Subset<T, EmailEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmailEventAggregateArgs>(args: Subset<T, EmailEventAggregateArgs>): Prisma.PrismaPromise<GetEmailEventAggregateType<T>>

    /**
     * Group by EmailEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventGroupByArgs} args - Group by arguments.
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
      T extends EmailEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailEventGroupByArgs['orderBy'] }
        : { orderBy?: EmailEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmailEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailEvent model
   */
  readonly fields: EmailEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subscriber<T extends SubscriberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubscriberDefaultArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EmailEvent model
   */
  interface EmailEventFieldRefs {
    readonly id: FieldRef<"EmailEvent", 'String'>
    readonly providerMessageId: FieldRef<"EmailEvent", 'String'>
    readonly status: FieldRef<"EmailEvent", 'EmailEventStatus'>
    readonly errorMessage: FieldRef<"EmailEvent", 'String'>
    readonly timestamp: FieldRef<"EmailEvent", 'DateTime'>
    readonly campaignId: FieldRef<"EmailEvent", 'String'>
    readonly subscriberId: FieldRef<"EmailEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EmailEvent findUnique
   */
  export type EmailEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent findUniqueOrThrow
   */
  export type EmailEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent findFirst
   */
  export type EmailEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailEvents.
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailEvents.
     */
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * EmailEvent findFirstOrThrow
   */
  export type EmailEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailEvents.
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailEvents.
     */
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * EmailEvent findMany
   */
  export type EmailEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvents to fetch.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailEvents.
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * EmailEvent create
   */
  export type EmailEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailEvent.
     */
    data: XOR<EmailEventCreateInput, EmailEventUncheckedCreateInput>
  }

  /**
   * EmailEvent createMany
   */
  export type EmailEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailEvents.
     */
    data: EmailEventCreateManyInput | EmailEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailEvent createManyAndReturn
   */
  export type EmailEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * The data used to create many EmailEvents.
     */
    data: EmailEventCreateManyInput | EmailEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailEvent update
   */
  export type EmailEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailEvent.
     */
    data: XOR<EmailEventUpdateInput, EmailEventUncheckedUpdateInput>
    /**
     * Choose, which EmailEvent to update.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent updateMany
   */
  export type EmailEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailEvents.
     */
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyInput>
    /**
     * Filter which EmailEvents to update
     */
    where?: EmailEventWhereInput
    /**
     * Limit how many EmailEvents to update.
     */
    limit?: number
  }

  /**
   * EmailEvent updateManyAndReturn
   */
  export type EmailEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * The data used to update EmailEvents.
     */
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyInput>
    /**
     * Filter which EmailEvents to update
     */
    where?: EmailEventWhereInput
    /**
     * Limit how many EmailEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailEvent upsert
   */
  export type EmailEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailEvent to update in case it exists.
     */
    where: EmailEventWhereUniqueInput
    /**
     * In case the EmailEvent found by the `where` argument doesn't exist, create a new EmailEvent with this data.
     */
    create: XOR<EmailEventCreateInput, EmailEventUncheckedCreateInput>
    /**
     * In case the EmailEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailEventUpdateInput, EmailEventUncheckedUpdateInput>
  }

  /**
   * EmailEvent delete
   */
  export type EmailEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter which EmailEvent to delete.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent deleteMany
   */
  export type EmailEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailEvents to delete
     */
    where?: EmailEventWhereInput
    /**
     * Limit how many EmailEvents to delete.
     */
    limit?: number
  }

  /**
   * EmailEvent without action
   */
  export type EmailEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
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
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
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
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
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
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClubScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type ClubScalarFieldEnum = (typeof ClubScalarFieldEnum)[keyof typeof ClubScalarFieldEnum]


  export const ClubMemberScalarFieldEnum: {
    id: 'id',
    role: 'role',
    createdAt: 'createdAt',
    clubId: 'clubId',
    userId: 'userId'
  };

  export type ClubMemberScalarFieldEnum = (typeof ClubMemberScalarFieldEnum)[keyof typeof ClubMemberScalarFieldEnum]


  export const ClubSettingsScalarFieldEnum: {
    id: 'id',
    fromName: 'fromName',
    fromEmail: 'fromEmail',
    replyToEmail: 'replyToEmail',
    defaultSubjectPrefix: 'defaultSubjectPrefix',
    footerText: 'footerText',
    physicalAddress: 'physicalAddress',
    clubId: 'clubId'
  };

  export type ClubSettingsScalarFieldEnum = (typeof ClubSettingsScalarFieldEnum)[keyof typeof ClubSettingsScalarFieldEnum]


  export const EmailListScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    clubId: 'clubId'
  };

  export type EmailListScalarFieldEnum = (typeof EmailListScalarFieldEnum)[keyof typeof EmailListScalarFieldEnum]


  export const SubscriberScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    status: 'status',
    unsubscribeToken: 'unsubscribeToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    clubId: 'clubId'
  };

  export type SubscriberScalarFieldEnum = (typeof SubscriberScalarFieldEnum)[keyof typeof SubscriberScalarFieldEnum]


  export const SubscriberListMembershipScalarFieldEnum: {
    subscribedAt: 'subscribedAt',
    unsubscribedAt: 'unsubscribedAt',
    subscriberId: 'subscriberId',
    emailListId: 'emailListId'
  };

  export type SubscriberListMembershipScalarFieldEnum = (typeof SubscriberListMembershipScalarFieldEnum)[keyof typeof SubscriberListMembershipScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    name: 'name',
    subject: 'subject',
    preheaderText: 'preheaderText',
    fromName: 'fromName',
    fromEmail: 'fromEmail',
    designJson: 'designJson',
    html: 'html',
    status: 'status',
    scheduledAt: 'scheduledAt',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    clubId: 'clubId',
    emailListId: 'emailListId',
    createdById: 'createdById'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const EmailEventScalarFieldEnum: {
    id: 'id',
    providerMessageId: 'providerMessageId',
    status: 'status',
    errorMessage: 'errorMessage',
    timestamp: 'timestamp',
    campaignId: 'campaignId',
    subscriberId: 'subscriberId'
  };

  export type EmailEventScalarFieldEnum = (typeof EmailEventScalarFieldEnum)[keyof typeof EmailEventScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ClubRole'
   */
  export type EnumClubRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClubRole'>
    


  /**
   * Reference to a field of type 'ClubRole[]'
   */
  export type ListEnumClubRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClubRole[]'>
    


  /**
   * Reference to a field of type 'SubscriberStatus'
   */
  export type EnumSubscriberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriberStatus'>
    


  /**
   * Reference to a field of type 'SubscriberStatus[]'
   */
  export type ListEnumSubscriberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriberStatus[]'>
    


  /**
   * Reference to a field of type 'CampaignStatus'
   */
  export type EnumCampaignStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignStatus'>
    


  /**
   * Reference to a field of type 'CampaignStatus[]'
   */
  export type ListEnumCampaignStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignStatus[]'>
    


  /**
   * Reference to a field of type 'EmailEventStatus'
   */
  export type EnumEmailEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmailEventStatus'>
    


  /**
   * Reference to a field of type 'EmailEventStatus[]'
   */
  export type ListEnumEmailEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmailEventStatus[]'>
    


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
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    clubsCreated?: ClubListRelationFilter
    clubMemberships?: ClubMemberListRelationFilter
    campaignsCreated?: CampaignListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    clubsCreated?: ClubOrderByRelationAggregateInput
    clubMemberships?: ClubMemberOrderByRelationAggregateInput
    campaignsCreated?: CampaignOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    clubsCreated?: ClubListRelationFilter
    clubMemberships?: ClubMemberListRelationFilter
    campaignsCreated?: CampaignListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
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
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClubWhereInput = {
    AND?: ClubWhereInput | ClubWhereInput[]
    OR?: ClubWhereInput[]
    NOT?: ClubWhereInput | ClubWhereInput[]
    id?: StringFilter<"Club"> | string
    name?: StringFilter<"Club"> | string
    slug?: StringFilter<"Club"> | string
    isActive?: BoolFilter<"Club"> | boolean
    createdAt?: DateTimeFilter<"Club"> | Date | string
    updatedAt?: DateTimeFilter<"Club"> | Date | string
    createdById?: StringFilter<"Club"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: ClubMemberListRelationFilter
    settings?: XOR<ClubSettingsNullableScalarRelationFilter, ClubSettingsWhereInput> | null
    emailLists?: EmailListListRelationFilter
    subscribers?: SubscriberListRelationFilter
    campaigns?: CampaignListRelationFilter
  }

  export type ClubOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    members?: ClubMemberOrderByRelationAggregateInput
    settings?: ClubSettingsOrderByWithRelationInput
    emailLists?: EmailListOrderByRelationAggregateInput
    subscribers?: SubscriberOrderByRelationAggregateInput
    campaigns?: CampaignOrderByRelationAggregateInput
  }

  export type ClubWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ClubWhereInput | ClubWhereInput[]
    OR?: ClubWhereInput[]
    NOT?: ClubWhereInput | ClubWhereInput[]
    name?: StringFilter<"Club"> | string
    isActive?: BoolFilter<"Club"> | boolean
    createdAt?: DateTimeFilter<"Club"> | Date | string
    updatedAt?: DateTimeFilter<"Club"> | Date | string
    createdById?: StringFilter<"Club"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: ClubMemberListRelationFilter
    settings?: XOR<ClubSettingsNullableScalarRelationFilter, ClubSettingsWhereInput> | null
    emailLists?: EmailListListRelationFilter
    subscribers?: SubscriberListRelationFilter
    campaigns?: CampaignListRelationFilter
  }, "id" | "slug">

  export type ClubOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    _count?: ClubCountOrderByAggregateInput
    _max?: ClubMaxOrderByAggregateInput
    _min?: ClubMinOrderByAggregateInput
  }

  export type ClubScalarWhereWithAggregatesInput = {
    AND?: ClubScalarWhereWithAggregatesInput | ClubScalarWhereWithAggregatesInput[]
    OR?: ClubScalarWhereWithAggregatesInput[]
    NOT?: ClubScalarWhereWithAggregatesInput | ClubScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Club"> | string
    name?: StringWithAggregatesFilter<"Club"> | string
    slug?: StringWithAggregatesFilter<"Club"> | string
    isActive?: BoolWithAggregatesFilter<"Club"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Club"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Club"> | Date | string
    createdById?: StringWithAggregatesFilter<"Club"> | string
  }

  export type ClubMemberWhereInput = {
    AND?: ClubMemberWhereInput | ClubMemberWhereInput[]
    OR?: ClubMemberWhereInput[]
    NOT?: ClubMemberWhereInput | ClubMemberWhereInput[]
    id?: StringFilter<"ClubMember"> | string
    role?: EnumClubRoleFilter<"ClubMember"> | $Enums.ClubRole
    createdAt?: DateTimeFilter<"ClubMember"> | Date | string
    clubId?: StringFilter<"ClubMember"> | string
    userId?: StringFilter<"ClubMember"> | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ClubMemberOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
    userId?: SortOrder
    club?: ClubOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ClubMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clubId_userId?: ClubMemberClubIdUserIdCompoundUniqueInput
    AND?: ClubMemberWhereInput | ClubMemberWhereInput[]
    OR?: ClubMemberWhereInput[]
    NOT?: ClubMemberWhereInput | ClubMemberWhereInput[]
    role?: EnumClubRoleFilter<"ClubMember"> | $Enums.ClubRole
    createdAt?: DateTimeFilter<"ClubMember"> | Date | string
    clubId?: StringFilter<"ClubMember"> | string
    userId?: StringFilter<"ClubMember"> | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "clubId_userId">

  export type ClubMemberOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
    userId?: SortOrder
    _count?: ClubMemberCountOrderByAggregateInput
    _max?: ClubMemberMaxOrderByAggregateInput
    _min?: ClubMemberMinOrderByAggregateInput
  }

  export type ClubMemberScalarWhereWithAggregatesInput = {
    AND?: ClubMemberScalarWhereWithAggregatesInput | ClubMemberScalarWhereWithAggregatesInput[]
    OR?: ClubMemberScalarWhereWithAggregatesInput[]
    NOT?: ClubMemberScalarWhereWithAggregatesInput | ClubMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClubMember"> | string
    role?: EnumClubRoleWithAggregatesFilter<"ClubMember"> | $Enums.ClubRole
    createdAt?: DateTimeWithAggregatesFilter<"ClubMember"> | Date | string
    clubId?: StringWithAggregatesFilter<"ClubMember"> | string
    userId?: StringWithAggregatesFilter<"ClubMember"> | string
  }

  export type ClubSettingsWhereInput = {
    AND?: ClubSettingsWhereInput | ClubSettingsWhereInput[]
    OR?: ClubSettingsWhereInput[]
    NOT?: ClubSettingsWhereInput | ClubSettingsWhereInput[]
    id?: StringFilter<"ClubSettings"> | string
    fromName?: StringFilter<"ClubSettings"> | string
    fromEmail?: StringFilter<"ClubSettings"> | string
    replyToEmail?: StringNullableFilter<"ClubSettings"> | string | null
    defaultSubjectPrefix?: StringNullableFilter<"ClubSettings"> | string | null
    footerText?: StringNullableFilter<"ClubSettings"> | string | null
    physicalAddress?: StringNullableFilter<"ClubSettings"> | string | null
    clubId?: StringFilter<"ClubSettings"> | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
  }

  export type ClubSettingsOrderByWithRelationInput = {
    id?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    replyToEmail?: SortOrderInput | SortOrder
    defaultSubjectPrefix?: SortOrderInput | SortOrder
    footerText?: SortOrderInput | SortOrder
    physicalAddress?: SortOrderInput | SortOrder
    clubId?: SortOrder
    club?: ClubOrderByWithRelationInput
  }

  export type ClubSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clubId?: string
    AND?: ClubSettingsWhereInput | ClubSettingsWhereInput[]
    OR?: ClubSettingsWhereInput[]
    NOT?: ClubSettingsWhereInput | ClubSettingsWhereInput[]
    fromName?: StringFilter<"ClubSettings"> | string
    fromEmail?: StringFilter<"ClubSettings"> | string
    replyToEmail?: StringNullableFilter<"ClubSettings"> | string | null
    defaultSubjectPrefix?: StringNullableFilter<"ClubSettings"> | string | null
    footerText?: StringNullableFilter<"ClubSettings"> | string | null
    physicalAddress?: StringNullableFilter<"ClubSettings"> | string | null
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
  }, "id" | "clubId">

  export type ClubSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    replyToEmail?: SortOrderInput | SortOrder
    defaultSubjectPrefix?: SortOrderInput | SortOrder
    footerText?: SortOrderInput | SortOrder
    physicalAddress?: SortOrderInput | SortOrder
    clubId?: SortOrder
    _count?: ClubSettingsCountOrderByAggregateInput
    _max?: ClubSettingsMaxOrderByAggregateInput
    _min?: ClubSettingsMinOrderByAggregateInput
  }

  export type ClubSettingsScalarWhereWithAggregatesInput = {
    AND?: ClubSettingsScalarWhereWithAggregatesInput | ClubSettingsScalarWhereWithAggregatesInput[]
    OR?: ClubSettingsScalarWhereWithAggregatesInput[]
    NOT?: ClubSettingsScalarWhereWithAggregatesInput | ClubSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClubSettings"> | string
    fromName?: StringWithAggregatesFilter<"ClubSettings"> | string
    fromEmail?: StringWithAggregatesFilter<"ClubSettings"> | string
    replyToEmail?: StringNullableWithAggregatesFilter<"ClubSettings"> | string | null
    defaultSubjectPrefix?: StringNullableWithAggregatesFilter<"ClubSettings"> | string | null
    footerText?: StringNullableWithAggregatesFilter<"ClubSettings"> | string | null
    physicalAddress?: StringNullableWithAggregatesFilter<"ClubSettings"> | string | null
    clubId?: StringWithAggregatesFilter<"ClubSettings"> | string
  }

  export type EmailListWhereInput = {
    AND?: EmailListWhereInput | EmailListWhereInput[]
    OR?: EmailListWhereInput[]
    NOT?: EmailListWhereInput | EmailListWhereInput[]
    id?: StringFilter<"EmailList"> | string
    name?: StringFilter<"EmailList"> | string
    description?: StringNullableFilter<"EmailList"> | string | null
    isDefault?: BoolFilter<"EmailList"> | boolean
    createdAt?: DateTimeFilter<"EmailList"> | Date | string
    clubId?: StringFilter<"EmailList"> | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    memberships?: SubscriberListMembershipListRelationFilter
    campaigns?: CampaignListRelationFilter
  }

  export type EmailListOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
    club?: ClubOrderByWithRelationInput
    memberships?: SubscriberListMembershipOrderByRelationAggregateInput
    campaigns?: CampaignOrderByRelationAggregateInput
  }

  export type EmailListWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailListWhereInput | EmailListWhereInput[]
    OR?: EmailListWhereInput[]
    NOT?: EmailListWhereInput | EmailListWhereInput[]
    name?: StringFilter<"EmailList"> | string
    description?: StringNullableFilter<"EmailList"> | string | null
    isDefault?: BoolFilter<"EmailList"> | boolean
    createdAt?: DateTimeFilter<"EmailList"> | Date | string
    clubId?: StringFilter<"EmailList"> | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    memberships?: SubscriberListMembershipListRelationFilter
    campaigns?: CampaignListRelationFilter
  }, "id">

  export type EmailListOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
    _count?: EmailListCountOrderByAggregateInput
    _max?: EmailListMaxOrderByAggregateInput
    _min?: EmailListMinOrderByAggregateInput
  }

  export type EmailListScalarWhereWithAggregatesInput = {
    AND?: EmailListScalarWhereWithAggregatesInput | EmailListScalarWhereWithAggregatesInput[]
    OR?: EmailListScalarWhereWithAggregatesInput[]
    NOT?: EmailListScalarWhereWithAggregatesInput | EmailListScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailList"> | string
    name?: StringWithAggregatesFilter<"EmailList"> | string
    description?: StringNullableWithAggregatesFilter<"EmailList"> | string | null
    isDefault?: BoolWithAggregatesFilter<"EmailList"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"EmailList"> | Date | string
    clubId?: StringWithAggregatesFilter<"EmailList"> | string
  }

  export type SubscriberWhereInput = {
    AND?: SubscriberWhereInput | SubscriberWhereInput[]
    OR?: SubscriberWhereInput[]
    NOT?: SubscriberWhereInput | SubscriberWhereInput[]
    id?: StringFilter<"Subscriber"> | string
    email?: StringFilter<"Subscriber"> | string
    name?: StringNullableFilter<"Subscriber"> | string | null
    status?: EnumSubscriberStatusFilter<"Subscriber"> | $Enums.SubscriberStatus
    unsubscribeToken?: StringFilter<"Subscriber"> | string
    createdAt?: DateTimeFilter<"Subscriber"> | Date | string
    updatedAt?: DateTimeFilter<"Subscriber"> | Date | string
    clubId?: StringFilter<"Subscriber"> | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    listMemberships?: SubscriberListMembershipListRelationFilter
    emailEvents?: EmailEventListRelationFilter
  }

  export type SubscriberOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
    club?: ClubOrderByWithRelationInput
    listMemberships?: SubscriberListMembershipOrderByRelationAggregateInput
    emailEvents?: EmailEventOrderByRelationAggregateInput
  }

  export type SubscriberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    unsubscribeToken?: string
    clubId_email?: SubscriberClubIdEmailCompoundUniqueInput
    AND?: SubscriberWhereInput | SubscriberWhereInput[]
    OR?: SubscriberWhereInput[]
    NOT?: SubscriberWhereInput | SubscriberWhereInput[]
    email?: StringFilter<"Subscriber"> | string
    name?: StringNullableFilter<"Subscriber"> | string | null
    status?: EnumSubscriberStatusFilter<"Subscriber"> | $Enums.SubscriberStatus
    createdAt?: DateTimeFilter<"Subscriber"> | Date | string
    updatedAt?: DateTimeFilter<"Subscriber"> | Date | string
    clubId?: StringFilter<"Subscriber"> | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    listMemberships?: SubscriberListMembershipListRelationFilter
    emailEvents?: EmailEventListRelationFilter
  }, "id" | "unsubscribeToken" | "clubId_email">

  export type SubscriberOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
    _count?: SubscriberCountOrderByAggregateInput
    _max?: SubscriberMaxOrderByAggregateInput
    _min?: SubscriberMinOrderByAggregateInput
  }

  export type SubscriberScalarWhereWithAggregatesInput = {
    AND?: SubscriberScalarWhereWithAggregatesInput | SubscriberScalarWhereWithAggregatesInput[]
    OR?: SubscriberScalarWhereWithAggregatesInput[]
    NOT?: SubscriberScalarWhereWithAggregatesInput | SubscriberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscriber"> | string
    email?: StringWithAggregatesFilter<"Subscriber"> | string
    name?: StringNullableWithAggregatesFilter<"Subscriber"> | string | null
    status?: EnumSubscriberStatusWithAggregatesFilter<"Subscriber"> | $Enums.SubscriberStatus
    unsubscribeToken?: StringWithAggregatesFilter<"Subscriber"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Subscriber"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscriber"> | Date | string
    clubId?: StringWithAggregatesFilter<"Subscriber"> | string
  }

  export type SubscriberListMembershipWhereInput = {
    AND?: SubscriberListMembershipWhereInput | SubscriberListMembershipWhereInput[]
    OR?: SubscriberListMembershipWhereInput[]
    NOT?: SubscriberListMembershipWhereInput | SubscriberListMembershipWhereInput[]
    subscribedAt?: DateTimeNullableFilter<"SubscriberListMembership"> | Date | string | null
    unsubscribedAt?: DateTimeNullableFilter<"SubscriberListMembership"> | Date | string | null
    subscriberId?: StringFilter<"SubscriberListMembership"> | string
    emailListId?: StringFilter<"SubscriberListMembership"> | string
    subscriber?: XOR<SubscriberScalarRelationFilter, SubscriberWhereInput>
    emailList?: XOR<EmailListScalarRelationFilter, EmailListWhereInput>
  }

  export type SubscriberListMembershipOrderByWithRelationInput = {
    subscribedAt?: SortOrderInput | SortOrder
    unsubscribedAt?: SortOrderInput | SortOrder
    subscriberId?: SortOrder
    emailListId?: SortOrder
    subscriber?: SubscriberOrderByWithRelationInput
    emailList?: EmailListOrderByWithRelationInput
  }

  export type SubscriberListMembershipWhereUniqueInput = Prisma.AtLeast<{
    subscriberId_emailListId?: SubscriberListMembershipSubscriberIdEmailListIdCompoundUniqueInput
    AND?: SubscriberListMembershipWhereInput | SubscriberListMembershipWhereInput[]
    OR?: SubscriberListMembershipWhereInput[]
    NOT?: SubscriberListMembershipWhereInput | SubscriberListMembershipWhereInput[]
    subscribedAt?: DateTimeNullableFilter<"SubscriberListMembership"> | Date | string | null
    unsubscribedAt?: DateTimeNullableFilter<"SubscriberListMembership"> | Date | string | null
    subscriberId?: StringFilter<"SubscriberListMembership"> | string
    emailListId?: StringFilter<"SubscriberListMembership"> | string
    subscriber?: XOR<SubscriberScalarRelationFilter, SubscriberWhereInput>
    emailList?: XOR<EmailListScalarRelationFilter, EmailListWhereInput>
  }, "subscriberId_emailListId">

  export type SubscriberListMembershipOrderByWithAggregationInput = {
    subscribedAt?: SortOrderInput | SortOrder
    unsubscribedAt?: SortOrderInput | SortOrder
    subscriberId?: SortOrder
    emailListId?: SortOrder
    _count?: SubscriberListMembershipCountOrderByAggregateInput
    _max?: SubscriberListMembershipMaxOrderByAggregateInput
    _min?: SubscriberListMembershipMinOrderByAggregateInput
  }

  export type SubscriberListMembershipScalarWhereWithAggregatesInput = {
    AND?: SubscriberListMembershipScalarWhereWithAggregatesInput | SubscriberListMembershipScalarWhereWithAggregatesInput[]
    OR?: SubscriberListMembershipScalarWhereWithAggregatesInput[]
    NOT?: SubscriberListMembershipScalarWhereWithAggregatesInput | SubscriberListMembershipScalarWhereWithAggregatesInput[]
    subscribedAt?: DateTimeNullableWithAggregatesFilter<"SubscriberListMembership"> | Date | string | null
    unsubscribedAt?: DateTimeNullableWithAggregatesFilter<"SubscriberListMembership"> | Date | string | null
    subscriberId?: StringWithAggregatesFilter<"SubscriberListMembership"> | string
    emailListId?: StringWithAggregatesFilter<"SubscriberListMembership"> | string
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    subject?: StringFilter<"Campaign"> | string
    preheaderText?: StringNullableFilter<"Campaign"> | string | null
    fromName?: StringFilter<"Campaign"> | string
    fromEmail?: StringFilter<"Campaign"> | string
    designJson?: StringFilter<"Campaign"> | string
    html?: StringFilter<"Campaign"> | string
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    scheduledAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    startedAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    clubId?: StringFilter<"Campaign"> | string
    emailListId?: StringFilter<"Campaign"> | string
    createdById?: StringFilter<"Campaign"> | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    emailList?: XOR<EmailListScalarRelationFilter, EmailListWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    emailEvents?: EmailEventListRelationFilter
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    preheaderText?: SortOrderInput | SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    designJson?: SortOrder
    html?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
    emailListId?: SortOrder
    createdById?: SortOrder
    club?: ClubOrderByWithRelationInput
    emailList?: EmailListOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    emailEvents?: EmailEventOrderByRelationAggregateInput
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    name?: StringFilter<"Campaign"> | string
    subject?: StringFilter<"Campaign"> | string
    preheaderText?: StringNullableFilter<"Campaign"> | string | null
    fromName?: StringFilter<"Campaign"> | string
    fromEmail?: StringFilter<"Campaign"> | string
    designJson?: StringFilter<"Campaign"> | string
    html?: StringFilter<"Campaign"> | string
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    scheduledAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    startedAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    clubId?: StringFilter<"Campaign"> | string
    emailListId?: StringFilter<"Campaign"> | string
    createdById?: StringFilter<"Campaign"> | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    emailList?: XOR<EmailListScalarRelationFilter, EmailListWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    emailEvents?: EmailEventListRelationFilter
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    preheaderText?: SortOrderInput | SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    designJson?: SortOrder
    html?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
    emailListId?: SortOrder
    createdById?: SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    name?: StringWithAggregatesFilter<"Campaign"> | string
    subject?: StringWithAggregatesFilter<"Campaign"> | string
    preheaderText?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    fromName?: StringWithAggregatesFilter<"Campaign"> | string
    fromEmail?: StringWithAggregatesFilter<"Campaign"> | string
    designJson?: StringWithAggregatesFilter<"Campaign"> | string
    html?: StringWithAggregatesFilter<"Campaign"> | string
    status?: EnumCampaignStatusWithAggregatesFilter<"Campaign"> | $Enums.CampaignStatus
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"Campaign"> | Date | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"Campaign"> | Date | string | null
    finishedAt?: DateTimeNullableWithAggregatesFilter<"Campaign"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    clubId?: StringWithAggregatesFilter<"Campaign"> | string
    emailListId?: StringWithAggregatesFilter<"Campaign"> | string
    createdById?: StringWithAggregatesFilter<"Campaign"> | string
  }

  export type EmailEventWhereInput = {
    AND?: EmailEventWhereInput | EmailEventWhereInput[]
    OR?: EmailEventWhereInput[]
    NOT?: EmailEventWhereInput | EmailEventWhereInput[]
    id?: StringFilter<"EmailEvent"> | string
    providerMessageId?: StringNullableFilter<"EmailEvent"> | string | null
    status?: EnumEmailEventStatusFilter<"EmailEvent"> | $Enums.EmailEventStatus
    errorMessage?: StringNullableFilter<"EmailEvent"> | string | null
    timestamp?: DateTimeFilter<"EmailEvent"> | Date | string
    campaignId?: StringFilter<"EmailEvent"> | string
    subscriberId?: StringFilter<"EmailEvent"> | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    subscriber?: XOR<SubscriberScalarRelationFilter, SubscriberWhereInput>
  }

  export type EmailEventOrderByWithRelationInput = {
    id?: SortOrder
    providerMessageId?: SortOrderInput | SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    campaignId?: SortOrder
    subscriberId?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
    subscriber?: SubscriberOrderByWithRelationInput
  }

  export type EmailEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailEventWhereInput | EmailEventWhereInput[]
    OR?: EmailEventWhereInput[]
    NOT?: EmailEventWhereInput | EmailEventWhereInput[]
    providerMessageId?: StringNullableFilter<"EmailEvent"> | string | null
    status?: EnumEmailEventStatusFilter<"EmailEvent"> | $Enums.EmailEventStatus
    errorMessage?: StringNullableFilter<"EmailEvent"> | string | null
    timestamp?: DateTimeFilter<"EmailEvent"> | Date | string
    campaignId?: StringFilter<"EmailEvent"> | string
    subscriberId?: StringFilter<"EmailEvent"> | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    subscriber?: XOR<SubscriberScalarRelationFilter, SubscriberWhereInput>
  }, "id">

  export type EmailEventOrderByWithAggregationInput = {
    id?: SortOrder
    providerMessageId?: SortOrderInput | SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    campaignId?: SortOrder
    subscriberId?: SortOrder
    _count?: EmailEventCountOrderByAggregateInput
    _max?: EmailEventMaxOrderByAggregateInput
    _min?: EmailEventMinOrderByAggregateInput
  }

  export type EmailEventScalarWhereWithAggregatesInput = {
    AND?: EmailEventScalarWhereWithAggregatesInput | EmailEventScalarWhereWithAggregatesInput[]
    OR?: EmailEventScalarWhereWithAggregatesInput[]
    NOT?: EmailEventScalarWhereWithAggregatesInput | EmailEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailEvent"> | string
    providerMessageId?: StringNullableWithAggregatesFilter<"EmailEvent"> | string | null
    status?: EnumEmailEventStatusWithAggregatesFilter<"EmailEvent"> | $Enums.EmailEventStatus
    errorMessage?: StringNullableWithAggregatesFilter<"EmailEvent"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"EmailEvent"> | Date | string
    campaignId?: StringWithAggregatesFilter<"EmailEvent"> | string
    subscriberId?: StringWithAggregatesFilter<"EmailEvent"> | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    clubsCreated?: ClubCreateNestedManyWithoutCreatedByInput
    clubMemberships?: ClubMemberCreateNestedManyWithoutUserInput
    campaignsCreated?: CampaignCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    clubsCreated?: ClubUncheckedCreateNestedManyWithoutCreatedByInput
    clubMemberships?: ClubMemberUncheckedCreateNestedManyWithoutUserInput
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUpdateManyWithoutCreatedByNestedInput
    clubMemberships?: ClubMemberUpdateManyWithoutUserNestedInput
    campaignsCreated?: CampaignUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUncheckedUpdateManyWithoutCreatedByNestedInput
    clubMemberships?: ClubMemberUncheckedUpdateManyWithoutUserNestedInput
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubCreateInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutClubsCreatedInput
    members?: ClubMemberCreateNestedManyWithoutClubInput
    settings?: ClubSettingsCreateNestedOneWithoutClubInput
    emailLists?: EmailListCreateNestedManyWithoutClubInput
    subscribers?: SubscriberCreateNestedManyWithoutClubInput
    campaigns?: CampaignCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    members?: ClubMemberUncheckedCreateNestedManyWithoutClubInput
    settings?: ClubSettingsUncheckedCreateNestedOneWithoutClubInput
    emailLists?: EmailListUncheckedCreateNestedManyWithoutClubInput
    subscribers?: SubscriberUncheckedCreateNestedManyWithoutClubInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutClubsCreatedNestedInput
    members?: ClubMemberUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    members?: ClubMemberUncheckedUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUncheckedUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUncheckedUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUncheckedUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutClubNestedInput
  }

  export type ClubCreateManyInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
  }

  export type ClubUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type ClubMemberCreateInput = {
    id?: string
    role: $Enums.ClubRole
    createdAt?: Date | string
    club: ClubCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutClubMembershipsInput
  }

  export type ClubMemberUncheckedCreateInput = {
    id?: string
    role: $Enums.ClubRole
    createdAt?: Date | string
    clubId: string
    userId: string
  }

  export type ClubMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutClubMembershipsNestedInput
  }

  export type ClubMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ClubMemberCreateManyInput = {
    id?: string
    role: $Enums.ClubRole
    createdAt?: Date | string
    clubId: string
    userId: string
  }

  export type ClubMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ClubSettingsCreateInput = {
    id?: string
    fromName: string
    fromEmail: string
    replyToEmail?: string | null
    defaultSubjectPrefix?: string | null
    footerText?: string | null
    physicalAddress?: string | null
    club: ClubCreateNestedOneWithoutSettingsInput
  }

  export type ClubSettingsUncheckedCreateInput = {
    id?: string
    fromName: string
    fromEmail: string
    replyToEmail?: string | null
    defaultSubjectPrefix?: string | null
    footerText?: string | null
    physicalAddress?: string | null
    clubId: string
  }

  export type ClubSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    replyToEmail?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSubjectPrefix?: NullableStringFieldUpdateOperationsInput | string | null
    footerText?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    club?: ClubUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type ClubSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    replyToEmail?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSubjectPrefix?: NullableStringFieldUpdateOperationsInput | string | null
    footerText?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: StringFieldUpdateOperationsInput | string
  }

  export type ClubSettingsCreateManyInput = {
    id?: string
    fromName: string
    fromEmail: string
    replyToEmail?: string | null
    defaultSubjectPrefix?: string | null
    footerText?: string | null
    physicalAddress?: string | null
    clubId: string
  }

  export type ClubSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    replyToEmail?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSubjectPrefix?: NullableStringFieldUpdateOperationsInput | string | null
    footerText?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClubSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    replyToEmail?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSubjectPrefix?: NullableStringFieldUpdateOperationsInput | string | null
    footerText?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: StringFieldUpdateOperationsInput | string
  }

  export type EmailListCreateInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    club: ClubCreateNestedOneWithoutEmailListsInput
    memberships?: SubscriberListMembershipCreateNestedManyWithoutEmailListInput
    campaigns?: CampaignCreateNestedManyWithoutEmailListInput
  }

  export type EmailListUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    clubId: string
    memberships?: SubscriberListMembershipUncheckedCreateNestedManyWithoutEmailListInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutEmailListInput
  }

  export type EmailListUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutEmailListsNestedInput
    memberships?: SubscriberListMembershipUpdateManyWithoutEmailListNestedInput
    campaigns?: CampaignUpdateManyWithoutEmailListNestedInput
  }

  export type EmailListUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    memberships?: SubscriberListMembershipUncheckedUpdateManyWithoutEmailListNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutEmailListNestedInput
  }

  export type EmailListCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    clubId: string
  }

  export type EmailListUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailListUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberCreateInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    club: ClubCreateNestedOneWithoutSubscribersInput
    listMemberships?: SubscriberListMembershipCreateNestedManyWithoutSubscriberInput
    emailEvents?: EmailEventCreateNestedManyWithoutSubscriberInput
  }

  export type SubscriberUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    listMemberships?: SubscriberListMembershipUncheckedCreateNestedManyWithoutSubscriberInput
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutSubscriberInput
  }

  export type SubscriberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutSubscribersNestedInput
    listMemberships?: SubscriberListMembershipUpdateManyWithoutSubscriberNestedInput
    emailEvents?: EmailEventUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscriberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    listMemberships?: SubscriberListMembershipUncheckedUpdateManyWithoutSubscriberNestedInput
    emailEvents?: EmailEventUncheckedUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscriberCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
  }

  export type SubscriberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberListMembershipCreateInput = {
    subscribedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    subscriber: SubscriberCreateNestedOneWithoutListMembershipsInput
    emailList: EmailListCreateNestedOneWithoutMembershipsInput
  }

  export type SubscriberListMembershipUncheckedCreateInput = {
    subscribedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    subscriberId: string
    emailListId: string
  }

  export type SubscriberListMembershipUpdateInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriber?: SubscriberUpdateOneRequiredWithoutListMembershipsNestedInput
    emailList?: EmailListUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type SubscriberListMembershipUncheckedUpdateInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriberId?: StringFieldUpdateOperationsInput | string
    emailListId?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberListMembershipCreateManyInput = {
    subscribedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    subscriberId: string
    emailListId: string
  }

  export type SubscriberListMembershipUpdateManyMutationInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubscriberListMembershipUncheckedUpdateManyInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriberId?: StringFieldUpdateOperationsInput | string
    emailListId?: StringFieldUpdateOperationsInput | string
  }

  export type CampaignCreateInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    club: ClubCreateNestedOneWithoutCampaignsInput
    emailList: EmailListCreateNestedOneWithoutCampaignsInput
    createdBy: UserCreateNestedOneWithoutCampaignsCreatedInput
    emailEvents?: EmailEventCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    emailListId: string
    createdById: string
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutCampaignsNestedInput
    emailList?: EmailListUpdateOneRequiredWithoutCampaignsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
    emailEvents?: EmailEventUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    emailListId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    emailEvents?: EmailEventUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateManyInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    emailListId: string
    createdById: string
  }

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    emailListId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type EmailEventCreateInput = {
    id?: string
    providerMessageId?: string | null
    status?: $Enums.EmailEventStatus
    errorMessage?: string | null
    timestamp?: Date | string
    campaign: CampaignCreateNestedOneWithoutEmailEventsInput
    subscriber: SubscriberCreateNestedOneWithoutEmailEventsInput
  }

  export type EmailEventUncheckedCreateInput = {
    id?: string
    providerMessageId?: string | null
    status?: $Enums.EmailEventStatus
    errorMessage?: string | null
    timestamp?: Date | string
    campaignId: string
    subscriberId: string
  }

  export type EmailEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutEmailEventsNestedInput
    subscriber?: SubscriberUpdateOneRequiredWithoutEmailEventsNestedInput
  }

  export type EmailEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignId?: StringFieldUpdateOperationsInput | string
    subscriberId?: StringFieldUpdateOperationsInput | string
  }

  export type EmailEventCreateManyInput = {
    id?: string
    providerMessageId?: string | null
    status?: $Enums.EmailEventStatus
    errorMessage?: string | null
    timestamp?: Date | string
    campaignId: string
    subscriberId: string
  }

  export type EmailEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignId?: StringFieldUpdateOperationsInput | string
    subscriberId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type ClubListRelationFilter = {
    every?: ClubWhereInput
    some?: ClubWhereInput
    none?: ClubWhereInput
  }

  export type ClubMemberListRelationFilter = {
    every?: ClubMemberWhereInput
    some?: ClubMemberWhereInput
    none?: ClubMemberWhereInput
  }

  export type CampaignListRelationFilter = {
    every?: CampaignWhereInput
    some?: CampaignWhereInput
    none?: CampaignWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClubOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClubMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type ClubSettingsNullableScalarRelationFilter = {
    is?: ClubSettingsWhereInput | null
    isNot?: ClubSettingsWhereInput | null
  }

  export type EmailListListRelationFilter = {
    every?: EmailListWhereInput
    some?: EmailListWhereInput
    none?: EmailListWhereInput
  }

  export type SubscriberListRelationFilter = {
    every?: SubscriberWhereInput
    some?: SubscriberWhereInput
    none?: SubscriberWhereInput
  }

  export type EmailListOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClubCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type ClubMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type ClubMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type EnumClubRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ClubRole | EnumClubRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumClubRoleFilter<$PrismaModel> | $Enums.ClubRole
  }

  export type ClubScalarRelationFilter = {
    is?: ClubWhereInput
    isNot?: ClubWhereInput
  }

  export type ClubMemberClubIdUserIdCompoundUniqueInput = {
    clubId: string
    userId: string
  }

  export type ClubMemberCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
    userId?: SortOrder
  }

  export type ClubMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
    userId?: SortOrder
  }

  export type ClubMemberMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
    userId?: SortOrder
  }

  export type EnumClubRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClubRole | EnumClubRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumClubRoleWithAggregatesFilter<$PrismaModel> | $Enums.ClubRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClubRoleFilter<$PrismaModel>
    _max?: NestedEnumClubRoleFilter<$PrismaModel>
  }

  export type ClubSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    replyToEmail?: SortOrder
    defaultSubjectPrefix?: SortOrder
    footerText?: SortOrder
    physicalAddress?: SortOrder
    clubId?: SortOrder
  }

  export type ClubSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    replyToEmail?: SortOrder
    defaultSubjectPrefix?: SortOrder
    footerText?: SortOrder
    physicalAddress?: SortOrder
    clubId?: SortOrder
  }

  export type ClubSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    replyToEmail?: SortOrder
    defaultSubjectPrefix?: SortOrder
    footerText?: SortOrder
    physicalAddress?: SortOrder
    clubId?: SortOrder
  }

  export type SubscriberListMembershipListRelationFilter = {
    every?: SubscriberListMembershipWhereInput
    some?: SubscriberListMembershipWhereInput
    none?: SubscriberListMembershipWhereInput
  }

  export type SubscriberListMembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailListCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
  }

  export type EmailListMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
  }

  export type EmailListMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    clubId?: SortOrder
  }

  export type EnumSubscriberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriberStatus | EnumSubscriberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriberStatus[] | ListEnumSubscriberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriberStatus[] | ListEnumSubscriberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriberStatusFilter<$PrismaModel> | $Enums.SubscriberStatus
  }

  export type EmailEventListRelationFilter = {
    every?: EmailEventWhereInput
    some?: EmailEventWhereInput
    none?: EmailEventWhereInput
  }

  export type EmailEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriberClubIdEmailCompoundUniqueInput = {
    clubId: string
    email: string
  }

  export type SubscriberCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    status?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
  }

  export type SubscriberMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    status?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
  }

  export type SubscriberMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    status?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
  }

  export type EnumSubscriberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriberStatus | EnumSubscriberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriberStatus[] | ListEnumSubscriberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriberStatus[] | ListEnumSubscriberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriberStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriberStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriberStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SubscriberScalarRelationFilter = {
    is?: SubscriberWhereInput
    isNot?: SubscriberWhereInput
  }

  export type EmailListScalarRelationFilter = {
    is?: EmailListWhereInput
    isNot?: EmailListWhereInput
  }

  export type SubscriberListMembershipSubscriberIdEmailListIdCompoundUniqueInput = {
    subscriberId: string
    emailListId: string
  }

  export type SubscriberListMembershipCountOrderByAggregateInput = {
    subscribedAt?: SortOrder
    unsubscribedAt?: SortOrder
    subscriberId?: SortOrder
    emailListId?: SortOrder
  }

  export type SubscriberListMembershipMaxOrderByAggregateInput = {
    subscribedAt?: SortOrder
    unsubscribedAt?: SortOrder
    subscriberId?: SortOrder
    emailListId?: SortOrder
  }

  export type SubscriberListMembershipMinOrderByAggregateInput = {
    subscribedAt?: SortOrder
    unsubscribedAt?: SortOrder
    subscriberId?: SortOrder
    emailListId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    preheaderText?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    designJson?: SortOrder
    html?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
    emailListId?: SortOrder
    createdById?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    preheaderText?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    designJson?: SortOrder
    html?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
    emailListId?: SortOrder
    createdById?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    preheaderText?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    designJson?: SortOrder
    html?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clubId?: SortOrder
    emailListId?: SortOrder
    createdById?: SortOrder
  }

  export type EnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignStatusFilter<$PrismaModel>
  }

  export type EnumEmailEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailEventStatus | EnumEmailEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmailEventStatus[] | ListEnumEmailEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmailEventStatus[] | ListEnumEmailEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmailEventStatusFilter<$PrismaModel> | $Enums.EmailEventStatus
  }

  export type CampaignScalarRelationFilter = {
    is?: CampaignWhereInput
    isNot?: CampaignWhereInput
  }

  export type EmailEventCountOrderByAggregateInput = {
    id?: SortOrder
    providerMessageId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    timestamp?: SortOrder
    campaignId?: SortOrder
    subscriberId?: SortOrder
  }

  export type EmailEventMaxOrderByAggregateInput = {
    id?: SortOrder
    providerMessageId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    timestamp?: SortOrder
    campaignId?: SortOrder
    subscriberId?: SortOrder
  }

  export type EmailEventMinOrderByAggregateInput = {
    id?: SortOrder
    providerMessageId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    timestamp?: SortOrder
    campaignId?: SortOrder
    subscriberId?: SortOrder
  }

  export type EnumEmailEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailEventStatus | EnumEmailEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmailEventStatus[] | ListEnumEmailEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmailEventStatus[] | ListEnumEmailEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmailEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmailEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmailEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEmailEventStatusFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ClubCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ClubCreateWithoutCreatedByInput, ClubUncheckedCreateWithoutCreatedByInput> | ClubCreateWithoutCreatedByInput[] | ClubUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ClubCreateOrConnectWithoutCreatedByInput | ClubCreateOrConnectWithoutCreatedByInput[]
    createMany?: ClubCreateManyCreatedByInputEnvelope
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
  }

  export type ClubMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<ClubMemberCreateWithoutUserInput, ClubMemberUncheckedCreateWithoutUserInput> | ClubMemberCreateWithoutUserInput[] | ClubMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClubMemberCreateOrConnectWithoutUserInput | ClubMemberCreateOrConnectWithoutUserInput[]
    createMany?: ClubMemberCreateManyUserInputEnvelope
    connect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
  }

  export type CampaignCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CampaignCreateWithoutCreatedByInput, CampaignUncheckedCreateWithoutCreatedByInput> | CampaignCreateWithoutCreatedByInput[] | CampaignUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutCreatedByInput | CampaignCreateOrConnectWithoutCreatedByInput[]
    createMany?: CampaignCreateManyCreatedByInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ClubUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ClubCreateWithoutCreatedByInput, ClubUncheckedCreateWithoutCreatedByInput> | ClubCreateWithoutCreatedByInput[] | ClubUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ClubCreateOrConnectWithoutCreatedByInput | ClubCreateOrConnectWithoutCreatedByInput[]
    createMany?: ClubCreateManyCreatedByInputEnvelope
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
  }

  export type ClubMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ClubMemberCreateWithoutUserInput, ClubMemberUncheckedCreateWithoutUserInput> | ClubMemberCreateWithoutUserInput[] | ClubMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClubMemberCreateOrConnectWithoutUserInput | ClubMemberCreateOrConnectWithoutUserInput[]
    createMany?: ClubMemberCreateManyUserInputEnvelope
    connect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CampaignCreateWithoutCreatedByInput, CampaignUncheckedCreateWithoutCreatedByInput> | CampaignCreateWithoutCreatedByInput[] | CampaignUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutCreatedByInput | CampaignCreateOrConnectWithoutCreatedByInput[]
    createMany?: CampaignCreateManyCreatedByInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ClubUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ClubCreateWithoutCreatedByInput, ClubUncheckedCreateWithoutCreatedByInput> | ClubCreateWithoutCreatedByInput[] | ClubUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ClubCreateOrConnectWithoutCreatedByInput | ClubCreateOrConnectWithoutCreatedByInput[]
    upsert?: ClubUpsertWithWhereUniqueWithoutCreatedByInput | ClubUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ClubCreateManyCreatedByInputEnvelope
    set?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
    disconnect?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
    delete?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
    update?: ClubUpdateWithWhereUniqueWithoutCreatedByInput | ClubUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ClubUpdateManyWithWhereWithoutCreatedByInput | ClubUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ClubScalarWhereInput | ClubScalarWhereInput[]
  }

  export type ClubMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClubMemberCreateWithoutUserInput, ClubMemberUncheckedCreateWithoutUserInput> | ClubMemberCreateWithoutUserInput[] | ClubMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClubMemberCreateOrConnectWithoutUserInput | ClubMemberCreateOrConnectWithoutUserInput[]
    upsert?: ClubMemberUpsertWithWhereUniqueWithoutUserInput | ClubMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClubMemberCreateManyUserInputEnvelope
    set?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    disconnect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    delete?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    connect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    update?: ClubMemberUpdateWithWhereUniqueWithoutUserInput | ClubMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClubMemberUpdateManyWithWhereWithoutUserInput | ClubMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClubMemberScalarWhereInput | ClubMemberScalarWhereInput[]
  }

  export type CampaignUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CampaignCreateWithoutCreatedByInput, CampaignUncheckedCreateWithoutCreatedByInput> | CampaignCreateWithoutCreatedByInput[] | CampaignUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutCreatedByInput | CampaignCreateOrConnectWithoutCreatedByInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutCreatedByInput | CampaignUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CampaignCreateManyCreatedByInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutCreatedByInput | CampaignUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutCreatedByInput | CampaignUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ClubUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ClubCreateWithoutCreatedByInput, ClubUncheckedCreateWithoutCreatedByInput> | ClubCreateWithoutCreatedByInput[] | ClubUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ClubCreateOrConnectWithoutCreatedByInput | ClubCreateOrConnectWithoutCreatedByInput[]
    upsert?: ClubUpsertWithWhereUniqueWithoutCreatedByInput | ClubUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ClubCreateManyCreatedByInputEnvelope
    set?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
    disconnect?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
    delete?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[]
    update?: ClubUpdateWithWhereUniqueWithoutCreatedByInput | ClubUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ClubUpdateManyWithWhereWithoutCreatedByInput | ClubUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ClubScalarWhereInput | ClubScalarWhereInput[]
  }

  export type ClubMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClubMemberCreateWithoutUserInput, ClubMemberUncheckedCreateWithoutUserInput> | ClubMemberCreateWithoutUserInput[] | ClubMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClubMemberCreateOrConnectWithoutUserInput | ClubMemberCreateOrConnectWithoutUserInput[]
    upsert?: ClubMemberUpsertWithWhereUniqueWithoutUserInput | ClubMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClubMemberCreateManyUserInputEnvelope
    set?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    disconnect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    delete?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    connect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    update?: ClubMemberUpdateWithWhereUniqueWithoutUserInput | ClubMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClubMemberUpdateManyWithWhereWithoutUserInput | ClubMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClubMemberScalarWhereInput | ClubMemberScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CampaignCreateWithoutCreatedByInput, CampaignUncheckedCreateWithoutCreatedByInput> | CampaignCreateWithoutCreatedByInput[] | CampaignUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutCreatedByInput | CampaignCreateOrConnectWithoutCreatedByInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutCreatedByInput | CampaignUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CampaignCreateManyCreatedByInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutCreatedByInput | CampaignUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutCreatedByInput | CampaignUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutClubsCreatedInput = {
    create?: XOR<UserCreateWithoutClubsCreatedInput, UserUncheckedCreateWithoutClubsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutClubsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type ClubMemberCreateNestedManyWithoutClubInput = {
    create?: XOR<ClubMemberCreateWithoutClubInput, ClubMemberUncheckedCreateWithoutClubInput> | ClubMemberCreateWithoutClubInput[] | ClubMemberUncheckedCreateWithoutClubInput[]
    connectOrCreate?: ClubMemberCreateOrConnectWithoutClubInput | ClubMemberCreateOrConnectWithoutClubInput[]
    createMany?: ClubMemberCreateManyClubInputEnvelope
    connect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
  }

  export type ClubSettingsCreateNestedOneWithoutClubInput = {
    create?: XOR<ClubSettingsCreateWithoutClubInput, ClubSettingsUncheckedCreateWithoutClubInput>
    connectOrCreate?: ClubSettingsCreateOrConnectWithoutClubInput
    connect?: ClubSettingsWhereUniqueInput
  }

  export type EmailListCreateNestedManyWithoutClubInput = {
    create?: XOR<EmailListCreateWithoutClubInput, EmailListUncheckedCreateWithoutClubInput> | EmailListCreateWithoutClubInput[] | EmailListUncheckedCreateWithoutClubInput[]
    connectOrCreate?: EmailListCreateOrConnectWithoutClubInput | EmailListCreateOrConnectWithoutClubInput[]
    createMany?: EmailListCreateManyClubInputEnvelope
    connect?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
  }

  export type SubscriberCreateNestedManyWithoutClubInput = {
    create?: XOR<SubscriberCreateWithoutClubInput, SubscriberUncheckedCreateWithoutClubInput> | SubscriberCreateWithoutClubInput[] | SubscriberUncheckedCreateWithoutClubInput[]
    connectOrCreate?: SubscriberCreateOrConnectWithoutClubInput | SubscriberCreateOrConnectWithoutClubInput[]
    createMany?: SubscriberCreateManyClubInputEnvelope
    connect?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
  }

  export type CampaignCreateNestedManyWithoutClubInput = {
    create?: XOR<CampaignCreateWithoutClubInput, CampaignUncheckedCreateWithoutClubInput> | CampaignCreateWithoutClubInput[] | CampaignUncheckedCreateWithoutClubInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutClubInput | CampaignCreateOrConnectWithoutClubInput[]
    createMany?: CampaignCreateManyClubInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type ClubMemberUncheckedCreateNestedManyWithoutClubInput = {
    create?: XOR<ClubMemberCreateWithoutClubInput, ClubMemberUncheckedCreateWithoutClubInput> | ClubMemberCreateWithoutClubInput[] | ClubMemberUncheckedCreateWithoutClubInput[]
    connectOrCreate?: ClubMemberCreateOrConnectWithoutClubInput | ClubMemberCreateOrConnectWithoutClubInput[]
    createMany?: ClubMemberCreateManyClubInputEnvelope
    connect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
  }

  export type ClubSettingsUncheckedCreateNestedOneWithoutClubInput = {
    create?: XOR<ClubSettingsCreateWithoutClubInput, ClubSettingsUncheckedCreateWithoutClubInput>
    connectOrCreate?: ClubSettingsCreateOrConnectWithoutClubInput
    connect?: ClubSettingsWhereUniqueInput
  }

  export type EmailListUncheckedCreateNestedManyWithoutClubInput = {
    create?: XOR<EmailListCreateWithoutClubInput, EmailListUncheckedCreateWithoutClubInput> | EmailListCreateWithoutClubInput[] | EmailListUncheckedCreateWithoutClubInput[]
    connectOrCreate?: EmailListCreateOrConnectWithoutClubInput | EmailListCreateOrConnectWithoutClubInput[]
    createMany?: EmailListCreateManyClubInputEnvelope
    connect?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
  }

  export type SubscriberUncheckedCreateNestedManyWithoutClubInput = {
    create?: XOR<SubscriberCreateWithoutClubInput, SubscriberUncheckedCreateWithoutClubInput> | SubscriberCreateWithoutClubInput[] | SubscriberUncheckedCreateWithoutClubInput[]
    connectOrCreate?: SubscriberCreateOrConnectWithoutClubInput | SubscriberCreateOrConnectWithoutClubInput[]
    createMany?: SubscriberCreateManyClubInputEnvelope
    connect?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutClubInput = {
    create?: XOR<CampaignCreateWithoutClubInput, CampaignUncheckedCreateWithoutClubInput> | CampaignCreateWithoutClubInput[] | CampaignUncheckedCreateWithoutClubInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutClubInput | CampaignCreateOrConnectWithoutClubInput[]
    createMany?: CampaignCreateManyClubInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutClubsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutClubsCreatedInput, UserUncheckedCreateWithoutClubsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutClubsCreatedInput
    upsert?: UserUpsertWithoutClubsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClubsCreatedInput, UserUpdateWithoutClubsCreatedInput>, UserUncheckedUpdateWithoutClubsCreatedInput>
  }

  export type ClubMemberUpdateManyWithoutClubNestedInput = {
    create?: XOR<ClubMemberCreateWithoutClubInput, ClubMemberUncheckedCreateWithoutClubInput> | ClubMemberCreateWithoutClubInput[] | ClubMemberUncheckedCreateWithoutClubInput[]
    connectOrCreate?: ClubMemberCreateOrConnectWithoutClubInput | ClubMemberCreateOrConnectWithoutClubInput[]
    upsert?: ClubMemberUpsertWithWhereUniqueWithoutClubInput | ClubMemberUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: ClubMemberCreateManyClubInputEnvelope
    set?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    disconnect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    delete?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    connect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    update?: ClubMemberUpdateWithWhereUniqueWithoutClubInput | ClubMemberUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: ClubMemberUpdateManyWithWhereWithoutClubInput | ClubMemberUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: ClubMemberScalarWhereInput | ClubMemberScalarWhereInput[]
  }

  export type ClubSettingsUpdateOneWithoutClubNestedInput = {
    create?: XOR<ClubSettingsCreateWithoutClubInput, ClubSettingsUncheckedCreateWithoutClubInput>
    connectOrCreate?: ClubSettingsCreateOrConnectWithoutClubInput
    upsert?: ClubSettingsUpsertWithoutClubInput
    disconnect?: ClubSettingsWhereInput | boolean
    delete?: ClubSettingsWhereInput | boolean
    connect?: ClubSettingsWhereUniqueInput
    update?: XOR<XOR<ClubSettingsUpdateToOneWithWhereWithoutClubInput, ClubSettingsUpdateWithoutClubInput>, ClubSettingsUncheckedUpdateWithoutClubInput>
  }

  export type EmailListUpdateManyWithoutClubNestedInput = {
    create?: XOR<EmailListCreateWithoutClubInput, EmailListUncheckedCreateWithoutClubInput> | EmailListCreateWithoutClubInput[] | EmailListUncheckedCreateWithoutClubInput[]
    connectOrCreate?: EmailListCreateOrConnectWithoutClubInput | EmailListCreateOrConnectWithoutClubInput[]
    upsert?: EmailListUpsertWithWhereUniqueWithoutClubInput | EmailListUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: EmailListCreateManyClubInputEnvelope
    set?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
    disconnect?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
    delete?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
    connect?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
    update?: EmailListUpdateWithWhereUniqueWithoutClubInput | EmailListUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: EmailListUpdateManyWithWhereWithoutClubInput | EmailListUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: EmailListScalarWhereInput | EmailListScalarWhereInput[]
  }

  export type SubscriberUpdateManyWithoutClubNestedInput = {
    create?: XOR<SubscriberCreateWithoutClubInput, SubscriberUncheckedCreateWithoutClubInput> | SubscriberCreateWithoutClubInput[] | SubscriberUncheckedCreateWithoutClubInput[]
    connectOrCreate?: SubscriberCreateOrConnectWithoutClubInput | SubscriberCreateOrConnectWithoutClubInput[]
    upsert?: SubscriberUpsertWithWhereUniqueWithoutClubInput | SubscriberUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: SubscriberCreateManyClubInputEnvelope
    set?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
    disconnect?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
    delete?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
    connect?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
    update?: SubscriberUpdateWithWhereUniqueWithoutClubInput | SubscriberUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: SubscriberUpdateManyWithWhereWithoutClubInput | SubscriberUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: SubscriberScalarWhereInput | SubscriberScalarWhereInput[]
  }

  export type CampaignUpdateManyWithoutClubNestedInput = {
    create?: XOR<CampaignCreateWithoutClubInput, CampaignUncheckedCreateWithoutClubInput> | CampaignCreateWithoutClubInput[] | CampaignUncheckedCreateWithoutClubInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutClubInput | CampaignCreateOrConnectWithoutClubInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutClubInput | CampaignUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: CampaignCreateManyClubInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutClubInput | CampaignUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutClubInput | CampaignUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type ClubMemberUncheckedUpdateManyWithoutClubNestedInput = {
    create?: XOR<ClubMemberCreateWithoutClubInput, ClubMemberUncheckedCreateWithoutClubInput> | ClubMemberCreateWithoutClubInput[] | ClubMemberUncheckedCreateWithoutClubInput[]
    connectOrCreate?: ClubMemberCreateOrConnectWithoutClubInput | ClubMemberCreateOrConnectWithoutClubInput[]
    upsert?: ClubMemberUpsertWithWhereUniqueWithoutClubInput | ClubMemberUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: ClubMemberCreateManyClubInputEnvelope
    set?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    disconnect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    delete?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    connect?: ClubMemberWhereUniqueInput | ClubMemberWhereUniqueInput[]
    update?: ClubMemberUpdateWithWhereUniqueWithoutClubInput | ClubMemberUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: ClubMemberUpdateManyWithWhereWithoutClubInput | ClubMemberUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: ClubMemberScalarWhereInput | ClubMemberScalarWhereInput[]
  }

  export type ClubSettingsUncheckedUpdateOneWithoutClubNestedInput = {
    create?: XOR<ClubSettingsCreateWithoutClubInput, ClubSettingsUncheckedCreateWithoutClubInput>
    connectOrCreate?: ClubSettingsCreateOrConnectWithoutClubInput
    upsert?: ClubSettingsUpsertWithoutClubInput
    disconnect?: ClubSettingsWhereInput | boolean
    delete?: ClubSettingsWhereInput | boolean
    connect?: ClubSettingsWhereUniqueInput
    update?: XOR<XOR<ClubSettingsUpdateToOneWithWhereWithoutClubInput, ClubSettingsUpdateWithoutClubInput>, ClubSettingsUncheckedUpdateWithoutClubInput>
  }

  export type EmailListUncheckedUpdateManyWithoutClubNestedInput = {
    create?: XOR<EmailListCreateWithoutClubInput, EmailListUncheckedCreateWithoutClubInput> | EmailListCreateWithoutClubInput[] | EmailListUncheckedCreateWithoutClubInput[]
    connectOrCreate?: EmailListCreateOrConnectWithoutClubInput | EmailListCreateOrConnectWithoutClubInput[]
    upsert?: EmailListUpsertWithWhereUniqueWithoutClubInput | EmailListUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: EmailListCreateManyClubInputEnvelope
    set?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
    disconnect?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
    delete?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
    connect?: EmailListWhereUniqueInput | EmailListWhereUniqueInput[]
    update?: EmailListUpdateWithWhereUniqueWithoutClubInput | EmailListUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: EmailListUpdateManyWithWhereWithoutClubInput | EmailListUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: EmailListScalarWhereInput | EmailListScalarWhereInput[]
  }

  export type SubscriberUncheckedUpdateManyWithoutClubNestedInput = {
    create?: XOR<SubscriberCreateWithoutClubInput, SubscriberUncheckedCreateWithoutClubInput> | SubscriberCreateWithoutClubInput[] | SubscriberUncheckedCreateWithoutClubInput[]
    connectOrCreate?: SubscriberCreateOrConnectWithoutClubInput | SubscriberCreateOrConnectWithoutClubInput[]
    upsert?: SubscriberUpsertWithWhereUniqueWithoutClubInput | SubscriberUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: SubscriberCreateManyClubInputEnvelope
    set?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
    disconnect?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
    delete?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
    connect?: SubscriberWhereUniqueInput | SubscriberWhereUniqueInput[]
    update?: SubscriberUpdateWithWhereUniqueWithoutClubInput | SubscriberUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: SubscriberUpdateManyWithWhereWithoutClubInput | SubscriberUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: SubscriberScalarWhereInput | SubscriberScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutClubNestedInput = {
    create?: XOR<CampaignCreateWithoutClubInput, CampaignUncheckedCreateWithoutClubInput> | CampaignCreateWithoutClubInput[] | CampaignUncheckedCreateWithoutClubInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutClubInput | CampaignCreateOrConnectWithoutClubInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutClubInput | CampaignUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: CampaignCreateManyClubInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutClubInput | CampaignUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutClubInput | CampaignUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type ClubCreateNestedOneWithoutMembersInput = {
    create?: XOR<ClubCreateWithoutMembersInput, ClubUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ClubCreateOrConnectWithoutMembersInput
    connect?: ClubWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClubMembershipsInput = {
    create?: XOR<UserCreateWithoutClubMembershipsInput, UserUncheckedCreateWithoutClubMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClubMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumClubRoleFieldUpdateOperationsInput = {
    set?: $Enums.ClubRole
  }

  export type ClubUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ClubCreateWithoutMembersInput, ClubUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ClubCreateOrConnectWithoutMembersInput
    upsert?: ClubUpsertWithoutMembersInput
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutMembersInput, ClubUpdateWithoutMembersInput>, ClubUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutClubMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutClubMembershipsInput, UserUncheckedCreateWithoutClubMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClubMembershipsInput
    upsert?: UserUpsertWithoutClubMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClubMembershipsInput, UserUpdateWithoutClubMembershipsInput>, UserUncheckedUpdateWithoutClubMembershipsInput>
  }

  export type ClubCreateNestedOneWithoutSettingsInput = {
    create?: XOR<ClubCreateWithoutSettingsInput, ClubUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: ClubCreateOrConnectWithoutSettingsInput
    connect?: ClubWhereUniqueInput
  }

  export type ClubUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<ClubCreateWithoutSettingsInput, ClubUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: ClubCreateOrConnectWithoutSettingsInput
    upsert?: ClubUpsertWithoutSettingsInput
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutSettingsInput, ClubUpdateWithoutSettingsInput>, ClubUncheckedUpdateWithoutSettingsInput>
  }

  export type ClubCreateNestedOneWithoutEmailListsInput = {
    create?: XOR<ClubCreateWithoutEmailListsInput, ClubUncheckedCreateWithoutEmailListsInput>
    connectOrCreate?: ClubCreateOrConnectWithoutEmailListsInput
    connect?: ClubWhereUniqueInput
  }

  export type SubscriberListMembershipCreateNestedManyWithoutEmailListInput = {
    create?: XOR<SubscriberListMembershipCreateWithoutEmailListInput, SubscriberListMembershipUncheckedCreateWithoutEmailListInput> | SubscriberListMembershipCreateWithoutEmailListInput[] | SubscriberListMembershipUncheckedCreateWithoutEmailListInput[]
    connectOrCreate?: SubscriberListMembershipCreateOrConnectWithoutEmailListInput | SubscriberListMembershipCreateOrConnectWithoutEmailListInput[]
    createMany?: SubscriberListMembershipCreateManyEmailListInputEnvelope
    connect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
  }

  export type CampaignCreateNestedManyWithoutEmailListInput = {
    create?: XOR<CampaignCreateWithoutEmailListInput, CampaignUncheckedCreateWithoutEmailListInput> | CampaignCreateWithoutEmailListInput[] | CampaignUncheckedCreateWithoutEmailListInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutEmailListInput | CampaignCreateOrConnectWithoutEmailListInput[]
    createMany?: CampaignCreateManyEmailListInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type SubscriberListMembershipUncheckedCreateNestedManyWithoutEmailListInput = {
    create?: XOR<SubscriberListMembershipCreateWithoutEmailListInput, SubscriberListMembershipUncheckedCreateWithoutEmailListInput> | SubscriberListMembershipCreateWithoutEmailListInput[] | SubscriberListMembershipUncheckedCreateWithoutEmailListInput[]
    connectOrCreate?: SubscriberListMembershipCreateOrConnectWithoutEmailListInput | SubscriberListMembershipCreateOrConnectWithoutEmailListInput[]
    createMany?: SubscriberListMembershipCreateManyEmailListInputEnvelope
    connect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutEmailListInput = {
    create?: XOR<CampaignCreateWithoutEmailListInput, CampaignUncheckedCreateWithoutEmailListInput> | CampaignCreateWithoutEmailListInput[] | CampaignUncheckedCreateWithoutEmailListInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutEmailListInput | CampaignCreateOrConnectWithoutEmailListInput[]
    createMany?: CampaignCreateManyEmailListInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type ClubUpdateOneRequiredWithoutEmailListsNestedInput = {
    create?: XOR<ClubCreateWithoutEmailListsInput, ClubUncheckedCreateWithoutEmailListsInput>
    connectOrCreate?: ClubCreateOrConnectWithoutEmailListsInput
    upsert?: ClubUpsertWithoutEmailListsInput
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutEmailListsInput, ClubUpdateWithoutEmailListsInput>, ClubUncheckedUpdateWithoutEmailListsInput>
  }

  export type SubscriberListMembershipUpdateManyWithoutEmailListNestedInput = {
    create?: XOR<SubscriberListMembershipCreateWithoutEmailListInput, SubscriberListMembershipUncheckedCreateWithoutEmailListInput> | SubscriberListMembershipCreateWithoutEmailListInput[] | SubscriberListMembershipUncheckedCreateWithoutEmailListInput[]
    connectOrCreate?: SubscriberListMembershipCreateOrConnectWithoutEmailListInput | SubscriberListMembershipCreateOrConnectWithoutEmailListInput[]
    upsert?: SubscriberListMembershipUpsertWithWhereUniqueWithoutEmailListInput | SubscriberListMembershipUpsertWithWhereUniqueWithoutEmailListInput[]
    createMany?: SubscriberListMembershipCreateManyEmailListInputEnvelope
    set?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    disconnect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    delete?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    connect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    update?: SubscriberListMembershipUpdateWithWhereUniqueWithoutEmailListInput | SubscriberListMembershipUpdateWithWhereUniqueWithoutEmailListInput[]
    updateMany?: SubscriberListMembershipUpdateManyWithWhereWithoutEmailListInput | SubscriberListMembershipUpdateManyWithWhereWithoutEmailListInput[]
    deleteMany?: SubscriberListMembershipScalarWhereInput | SubscriberListMembershipScalarWhereInput[]
  }

  export type CampaignUpdateManyWithoutEmailListNestedInput = {
    create?: XOR<CampaignCreateWithoutEmailListInput, CampaignUncheckedCreateWithoutEmailListInput> | CampaignCreateWithoutEmailListInput[] | CampaignUncheckedCreateWithoutEmailListInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutEmailListInput | CampaignCreateOrConnectWithoutEmailListInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutEmailListInput | CampaignUpsertWithWhereUniqueWithoutEmailListInput[]
    createMany?: CampaignCreateManyEmailListInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutEmailListInput | CampaignUpdateWithWhereUniqueWithoutEmailListInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutEmailListInput | CampaignUpdateManyWithWhereWithoutEmailListInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type SubscriberListMembershipUncheckedUpdateManyWithoutEmailListNestedInput = {
    create?: XOR<SubscriberListMembershipCreateWithoutEmailListInput, SubscriberListMembershipUncheckedCreateWithoutEmailListInput> | SubscriberListMembershipCreateWithoutEmailListInput[] | SubscriberListMembershipUncheckedCreateWithoutEmailListInput[]
    connectOrCreate?: SubscriberListMembershipCreateOrConnectWithoutEmailListInput | SubscriberListMembershipCreateOrConnectWithoutEmailListInput[]
    upsert?: SubscriberListMembershipUpsertWithWhereUniqueWithoutEmailListInput | SubscriberListMembershipUpsertWithWhereUniqueWithoutEmailListInput[]
    createMany?: SubscriberListMembershipCreateManyEmailListInputEnvelope
    set?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    disconnect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    delete?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    connect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    update?: SubscriberListMembershipUpdateWithWhereUniqueWithoutEmailListInput | SubscriberListMembershipUpdateWithWhereUniqueWithoutEmailListInput[]
    updateMany?: SubscriberListMembershipUpdateManyWithWhereWithoutEmailListInput | SubscriberListMembershipUpdateManyWithWhereWithoutEmailListInput[]
    deleteMany?: SubscriberListMembershipScalarWhereInput | SubscriberListMembershipScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutEmailListNestedInput = {
    create?: XOR<CampaignCreateWithoutEmailListInput, CampaignUncheckedCreateWithoutEmailListInput> | CampaignCreateWithoutEmailListInput[] | CampaignUncheckedCreateWithoutEmailListInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutEmailListInput | CampaignCreateOrConnectWithoutEmailListInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutEmailListInput | CampaignUpsertWithWhereUniqueWithoutEmailListInput[]
    createMany?: CampaignCreateManyEmailListInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutEmailListInput | CampaignUpdateWithWhereUniqueWithoutEmailListInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutEmailListInput | CampaignUpdateManyWithWhereWithoutEmailListInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type ClubCreateNestedOneWithoutSubscribersInput = {
    create?: XOR<ClubCreateWithoutSubscribersInput, ClubUncheckedCreateWithoutSubscribersInput>
    connectOrCreate?: ClubCreateOrConnectWithoutSubscribersInput
    connect?: ClubWhereUniqueInput
  }

  export type SubscriberListMembershipCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<SubscriberListMembershipCreateWithoutSubscriberInput, SubscriberListMembershipUncheckedCreateWithoutSubscriberInput> | SubscriberListMembershipCreateWithoutSubscriberInput[] | SubscriberListMembershipUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: SubscriberListMembershipCreateOrConnectWithoutSubscriberInput | SubscriberListMembershipCreateOrConnectWithoutSubscriberInput[]
    createMany?: SubscriberListMembershipCreateManySubscriberInputEnvelope
    connect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
  }

  export type EmailEventCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<EmailEventCreateWithoutSubscriberInput, EmailEventUncheckedCreateWithoutSubscriberInput> | EmailEventCreateWithoutSubscriberInput[] | EmailEventUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutSubscriberInput | EmailEventCreateOrConnectWithoutSubscriberInput[]
    createMany?: EmailEventCreateManySubscriberInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type SubscriberListMembershipUncheckedCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<SubscriberListMembershipCreateWithoutSubscriberInput, SubscriberListMembershipUncheckedCreateWithoutSubscriberInput> | SubscriberListMembershipCreateWithoutSubscriberInput[] | SubscriberListMembershipUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: SubscriberListMembershipCreateOrConnectWithoutSubscriberInput | SubscriberListMembershipCreateOrConnectWithoutSubscriberInput[]
    createMany?: SubscriberListMembershipCreateManySubscriberInputEnvelope
    connect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
  }

  export type EmailEventUncheckedCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<EmailEventCreateWithoutSubscriberInput, EmailEventUncheckedCreateWithoutSubscriberInput> | EmailEventCreateWithoutSubscriberInput[] | EmailEventUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutSubscriberInput | EmailEventCreateOrConnectWithoutSubscriberInput[]
    createMany?: EmailEventCreateManySubscriberInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type EnumSubscriberStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriberStatus
  }

  export type ClubUpdateOneRequiredWithoutSubscribersNestedInput = {
    create?: XOR<ClubCreateWithoutSubscribersInput, ClubUncheckedCreateWithoutSubscribersInput>
    connectOrCreate?: ClubCreateOrConnectWithoutSubscribersInput
    upsert?: ClubUpsertWithoutSubscribersInput
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutSubscribersInput, ClubUpdateWithoutSubscribersInput>, ClubUncheckedUpdateWithoutSubscribersInput>
  }

  export type SubscriberListMembershipUpdateManyWithoutSubscriberNestedInput = {
    create?: XOR<SubscriberListMembershipCreateWithoutSubscriberInput, SubscriberListMembershipUncheckedCreateWithoutSubscriberInput> | SubscriberListMembershipCreateWithoutSubscriberInput[] | SubscriberListMembershipUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: SubscriberListMembershipCreateOrConnectWithoutSubscriberInput | SubscriberListMembershipCreateOrConnectWithoutSubscriberInput[]
    upsert?: SubscriberListMembershipUpsertWithWhereUniqueWithoutSubscriberInput | SubscriberListMembershipUpsertWithWhereUniqueWithoutSubscriberInput[]
    createMany?: SubscriberListMembershipCreateManySubscriberInputEnvelope
    set?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    disconnect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    delete?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    connect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    update?: SubscriberListMembershipUpdateWithWhereUniqueWithoutSubscriberInput | SubscriberListMembershipUpdateWithWhereUniqueWithoutSubscriberInput[]
    updateMany?: SubscriberListMembershipUpdateManyWithWhereWithoutSubscriberInput | SubscriberListMembershipUpdateManyWithWhereWithoutSubscriberInput[]
    deleteMany?: SubscriberListMembershipScalarWhereInput | SubscriberListMembershipScalarWhereInput[]
  }

  export type EmailEventUpdateManyWithoutSubscriberNestedInput = {
    create?: XOR<EmailEventCreateWithoutSubscriberInput, EmailEventUncheckedCreateWithoutSubscriberInput> | EmailEventCreateWithoutSubscriberInput[] | EmailEventUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutSubscriberInput | EmailEventCreateOrConnectWithoutSubscriberInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutSubscriberInput | EmailEventUpsertWithWhereUniqueWithoutSubscriberInput[]
    createMany?: EmailEventCreateManySubscriberInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutSubscriberInput | EmailEventUpdateWithWhereUniqueWithoutSubscriberInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutSubscriberInput | EmailEventUpdateManyWithWhereWithoutSubscriberInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type SubscriberListMembershipUncheckedUpdateManyWithoutSubscriberNestedInput = {
    create?: XOR<SubscriberListMembershipCreateWithoutSubscriberInput, SubscriberListMembershipUncheckedCreateWithoutSubscriberInput> | SubscriberListMembershipCreateWithoutSubscriberInput[] | SubscriberListMembershipUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: SubscriberListMembershipCreateOrConnectWithoutSubscriberInput | SubscriberListMembershipCreateOrConnectWithoutSubscriberInput[]
    upsert?: SubscriberListMembershipUpsertWithWhereUniqueWithoutSubscriberInput | SubscriberListMembershipUpsertWithWhereUniqueWithoutSubscriberInput[]
    createMany?: SubscriberListMembershipCreateManySubscriberInputEnvelope
    set?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    disconnect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    delete?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    connect?: SubscriberListMembershipWhereUniqueInput | SubscriberListMembershipWhereUniqueInput[]
    update?: SubscriberListMembershipUpdateWithWhereUniqueWithoutSubscriberInput | SubscriberListMembershipUpdateWithWhereUniqueWithoutSubscriberInput[]
    updateMany?: SubscriberListMembershipUpdateManyWithWhereWithoutSubscriberInput | SubscriberListMembershipUpdateManyWithWhereWithoutSubscriberInput[]
    deleteMany?: SubscriberListMembershipScalarWhereInput | SubscriberListMembershipScalarWhereInput[]
  }

  export type EmailEventUncheckedUpdateManyWithoutSubscriberNestedInput = {
    create?: XOR<EmailEventCreateWithoutSubscriberInput, EmailEventUncheckedCreateWithoutSubscriberInput> | EmailEventCreateWithoutSubscriberInput[] | EmailEventUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutSubscriberInput | EmailEventCreateOrConnectWithoutSubscriberInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutSubscriberInput | EmailEventUpsertWithWhereUniqueWithoutSubscriberInput[]
    createMany?: EmailEventCreateManySubscriberInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutSubscriberInput | EmailEventUpdateWithWhereUniqueWithoutSubscriberInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutSubscriberInput | EmailEventUpdateManyWithWhereWithoutSubscriberInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type SubscriberCreateNestedOneWithoutListMembershipsInput = {
    create?: XOR<SubscriberCreateWithoutListMembershipsInput, SubscriberUncheckedCreateWithoutListMembershipsInput>
    connectOrCreate?: SubscriberCreateOrConnectWithoutListMembershipsInput
    connect?: SubscriberWhereUniqueInput
  }

  export type EmailListCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<EmailListCreateWithoutMembershipsInput, EmailListUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: EmailListCreateOrConnectWithoutMembershipsInput
    connect?: EmailListWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SubscriberUpdateOneRequiredWithoutListMembershipsNestedInput = {
    create?: XOR<SubscriberCreateWithoutListMembershipsInput, SubscriberUncheckedCreateWithoutListMembershipsInput>
    connectOrCreate?: SubscriberCreateOrConnectWithoutListMembershipsInput
    upsert?: SubscriberUpsertWithoutListMembershipsInput
    connect?: SubscriberWhereUniqueInput
    update?: XOR<XOR<SubscriberUpdateToOneWithWhereWithoutListMembershipsInput, SubscriberUpdateWithoutListMembershipsInput>, SubscriberUncheckedUpdateWithoutListMembershipsInput>
  }

  export type EmailListUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<EmailListCreateWithoutMembershipsInput, EmailListUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: EmailListCreateOrConnectWithoutMembershipsInput
    upsert?: EmailListUpsertWithoutMembershipsInput
    connect?: EmailListWhereUniqueInput
    update?: XOR<XOR<EmailListUpdateToOneWithWhereWithoutMembershipsInput, EmailListUpdateWithoutMembershipsInput>, EmailListUncheckedUpdateWithoutMembershipsInput>
  }

  export type ClubCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<ClubCreateWithoutCampaignsInput, ClubUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: ClubCreateOrConnectWithoutCampaignsInput
    connect?: ClubWhereUniqueInput
  }

  export type EmailListCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<EmailListCreateWithoutCampaignsInput, EmailListUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: EmailListCreateOrConnectWithoutCampaignsInput
    connect?: EmailListWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCampaignsCreatedInput = {
    create?: XOR<UserCreateWithoutCampaignsCreatedInput, UserUncheckedCreateWithoutCampaignsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type EmailEventCreateNestedManyWithoutCampaignInput = {
    create?: XOR<EmailEventCreateWithoutCampaignInput, EmailEventUncheckedCreateWithoutCampaignInput> | EmailEventCreateWithoutCampaignInput[] | EmailEventUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutCampaignInput | EmailEventCreateOrConnectWithoutCampaignInput[]
    createMany?: EmailEventCreateManyCampaignInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type EmailEventUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<EmailEventCreateWithoutCampaignInput, EmailEventUncheckedCreateWithoutCampaignInput> | EmailEventCreateWithoutCampaignInput[] | EmailEventUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutCampaignInput | EmailEventCreateOrConnectWithoutCampaignInput[]
    createMany?: EmailEventCreateManyCampaignInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type EnumCampaignStatusFieldUpdateOperationsInput = {
    set?: $Enums.CampaignStatus
  }

  export type ClubUpdateOneRequiredWithoutCampaignsNestedInput = {
    create?: XOR<ClubCreateWithoutCampaignsInput, ClubUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: ClubCreateOrConnectWithoutCampaignsInput
    upsert?: ClubUpsertWithoutCampaignsInput
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutCampaignsInput, ClubUpdateWithoutCampaignsInput>, ClubUncheckedUpdateWithoutCampaignsInput>
  }

  export type EmailListUpdateOneRequiredWithoutCampaignsNestedInput = {
    create?: XOR<EmailListCreateWithoutCampaignsInput, EmailListUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: EmailListCreateOrConnectWithoutCampaignsInput
    upsert?: EmailListUpsertWithoutCampaignsInput
    connect?: EmailListWhereUniqueInput
    update?: XOR<XOR<EmailListUpdateToOneWithWhereWithoutCampaignsInput, EmailListUpdateWithoutCampaignsInput>, EmailListUncheckedUpdateWithoutCampaignsInput>
  }

  export type UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutCampaignsCreatedInput, UserUncheckedCreateWithoutCampaignsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignsCreatedInput
    upsert?: UserUpsertWithoutCampaignsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCampaignsCreatedInput, UserUpdateWithoutCampaignsCreatedInput>, UserUncheckedUpdateWithoutCampaignsCreatedInput>
  }

  export type EmailEventUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<EmailEventCreateWithoutCampaignInput, EmailEventUncheckedCreateWithoutCampaignInput> | EmailEventCreateWithoutCampaignInput[] | EmailEventUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutCampaignInput | EmailEventCreateOrConnectWithoutCampaignInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutCampaignInput | EmailEventUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: EmailEventCreateManyCampaignInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutCampaignInput | EmailEventUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutCampaignInput | EmailEventUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type EmailEventUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<EmailEventCreateWithoutCampaignInput, EmailEventUncheckedCreateWithoutCampaignInput> | EmailEventCreateWithoutCampaignInput[] | EmailEventUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutCampaignInput | EmailEventCreateOrConnectWithoutCampaignInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutCampaignInput | EmailEventUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: EmailEventCreateManyCampaignInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutCampaignInput | EmailEventUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutCampaignInput | EmailEventUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type CampaignCreateNestedOneWithoutEmailEventsInput = {
    create?: XOR<CampaignCreateWithoutEmailEventsInput, CampaignUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutEmailEventsInput
    connect?: CampaignWhereUniqueInput
  }

  export type SubscriberCreateNestedOneWithoutEmailEventsInput = {
    create?: XOR<SubscriberCreateWithoutEmailEventsInput, SubscriberUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: SubscriberCreateOrConnectWithoutEmailEventsInput
    connect?: SubscriberWhereUniqueInput
  }

  export type EnumEmailEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmailEventStatus
  }

  export type CampaignUpdateOneRequiredWithoutEmailEventsNestedInput = {
    create?: XOR<CampaignCreateWithoutEmailEventsInput, CampaignUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutEmailEventsInput
    upsert?: CampaignUpsertWithoutEmailEventsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutEmailEventsInput, CampaignUpdateWithoutEmailEventsInput>, CampaignUncheckedUpdateWithoutEmailEventsInput>
  }

  export type SubscriberUpdateOneRequiredWithoutEmailEventsNestedInput = {
    create?: XOR<SubscriberCreateWithoutEmailEventsInput, SubscriberUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: SubscriberCreateOrConnectWithoutEmailEventsInput
    upsert?: SubscriberUpsertWithoutEmailEventsInput
    connect?: SubscriberWhereUniqueInput
    update?: XOR<XOR<SubscriberUpdateToOneWithWhereWithoutEmailEventsInput, SubscriberUpdateWithoutEmailEventsInput>, SubscriberUncheckedUpdateWithoutEmailEventsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type NestedEnumClubRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ClubRole | EnumClubRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumClubRoleFilter<$PrismaModel> | $Enums.ClubRole
  }

  export type NestedEnumClubRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClubRole | EnumClubRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumClubRoleWithAggregatesFilter<$PrismaModel> | $Enums.ClubRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClubRoleFilter<$PrismaModel>
    _max?: NestedEnumClubRoleFilter<$PrismaModel>
  }

  export type NestedEnumSubscriberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriberStatus | EnumSubscriberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriberStatus[] | ListEnumSubscriberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriberStatus[] | ListEnumSubscriberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriberStatusFilter<$PrismaModel> | $Enums.SubscriberStatus
  }

  export type NestedEnumSubscriberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriberStatus | EnumSubscriberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriberStatus[] | ListEnumSubscriberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriberStatus[] | ListEnumSubscriberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriberStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriberStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriberStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus
  }

  export type NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignStatusFilter<$PrismaModel>
  }

  export type NestedEnumEmailEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailEventStatus | EnumEmailEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmailEventStatus[] | ListEnumEmailEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmailEventStatus[] | ListEnumEmailEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmailEventStatusFilter<$PrismaModel> | $Enums.EmailEventStatus
  }

  export type NestedEnumEmailEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailEventStatus | EnumEmailEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmailEventStatus[] | ListEnumEmailEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmailEventStatus[] | ListEnumEmailEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmailEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmailEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmailEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEmailEventStatusFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ClubCreateWithoutCreatedByInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ClubMemberCreateNestedManyWithoutClubInput
    settings?: ClubSettingsCreateNestedOneWithoutClubInput
    emailLists?: EmailListCreateNestedManyWithoutClubInput
    subscribers?: SubscriberCreateNestedManyWithoutClubInput
    campaigns?: CampaignCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ClubMemberUncheckedCreateNestedManyWithoutClubInput
    settings?: ClubSettingsUncheckedCreateNestedOneWithoutClubInput
    emailLists?: EmailListUncheckedCreateNestedManyWithoutClubInput
    subscribers?: SubscriberUncheckedCreateNestedManyWithoutClubInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutCreatedByInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutCreatedByInput, ClubUncheckedCreateWithoutCreatedByInput>
  }

  export type ClubCreateManyCreatedByInputEnvelope = {
    data: ClubCreateManyCreatedByInput | ClubCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ClubMemberCreateWithoutUserInput = {
    id?: string
    role: $Enums.ClubRole
    createdAt?: Date | string
    club: ClubCreateNestedOneWithoutMembersInput
  }

  export type ClubMemberUncheckedCreateWithoutUserInput = {
    id?: string
    role: $Enums.ClubRole
    createdAt?: Date | string
    clubId: string
  }

  export type ClubMemberCreateOrConnectWithoutUserInput = {
    where: ClubMemberWhereUniqueInput
    create: XOR<ClubMemberCreateWithoutUserInput, ClubMemberUncheckedCreateWithoutUserInput>
  }

  export type ClubMemberCreateManyUserInputEnvelope = {
    data: ClubMemberCreateManyUserInput | ClubMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CampaignCreateWithoutCreatedByInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    club: ClubCreateNestedOneWithoutCampaignsInput
    emailList: EmailListCreateNestedOneWithoutCampaignsInput
    emailEvents?: EmailEventCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    emailListId: string
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutCreatedByInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutCreatedByInput, CampaignUncheckedCreateWithoutCreatedByInput>
  }

  export type CampaignCreateManyCreatedByInputEnvelope = {
    data: CampaignCreateManyCreatedByInput | CampaignCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type ClubUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ClubWhereUniqueInput
    update: XOR<ClubUpdateWithoutCreatedByInput, ClubUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ClubCreateWithoutCreatedByInput, ClubUncheckedCreateWithoutCreatedByInput>
  }

  export type ClubUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ClubWhereUniqueInput
    data: XOR<ClubUpdateWithoutCreatedByInput, ClubUncheckedUpdateWithoutCreatedByInput>
  }

  export type ClubUpdateManyWithWhereWithoutCreatedByInput = {
    where: ClubScalarWhereInput
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ClubScalarWhereInput = {
    AND?: ClubScalarWhereInput | ClubScalarWhereInput[]
    OR?: ClubScalarWhereInput[]
    NOT?: ClubScalarWhereInput | ClubScalarWhereInput[]
    id?: StringFilter<"Club"> | string
    name?: StringFilter<"Club"> | string
    slug?: StringFilter<"Club"> | string
    isActive?: BoolFilter<"Club"> | boolean
    createdAt?: DateTimeFilter<"Club"> | Date | string
    updatedAt?: DateTimeFilter<"Club"> | Date | string
    createdById?: StringFilter<"Club"> | string
  }

  export type ClubMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: ClubMemberWhereUniqueInput
    update: XOR<ClubMemberUpdateWithoutUserInput, ClubMemberUncheckedUpdateWithoutUserInput>
    create: XOR<ClubMemberCreateWithoutUserInput, ClubMemberUncheckedCreateWithoutUserInput>
  }

  export type ClubMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: ClubMemberWhereUniqueInput
    data: XOR<ClubMemberUpdateWithoutUserInput, ClubMemberUncheckedUpdateWithoutUserInput>
  }

  export type ClubMemberUpdateManyWithWhereWithoutUserInput = {
    where: ClubMemberScalarWhereInput
    data: XOR<ClubMemberUpdateManyMutationInput, ClubMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type ClubMemberScalarWhereInput = {
    AND?: ClubMemberScalarWhereInput | ClubMemberScalarWhereInput[]
    OR?: ClubMemberScalarWhereInput[]
    NOT?: ClubMemberScalarWhereInput | ClubMemberScalarWhereInput[]
    id?: StringFilter<"ClubMember"> | string
    role?: EnumClubRoleFilter<"ClubMember"> | $Enums.ClubRole
    createdAt?: DateTimeFilter<"ClubMember"> | Date | string
    clubId?: StringFilter<"ClubMember"> | string
    userId?: StringFilter<"ClubMember"> | string
  }

  export type CampaignUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutCreatedByInput, CampaignUncheckedUpdateWithoutCreatedByInput>
    create: XOR<CampaignCreateWithoutCreatedByInput, CampaignUncheckedCreateWithoutCreatedByInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutCreatedByInput, CampaignUncheckedUpdateWithoutCreatedByInput>
  }

  export type CampaignUpdateManyWithWhereWithoutCreatedByInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    OR?: CampaignScalarWhereInput[]
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    id?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    subject?: StringFilter<"Campaign"> | string
    preheaderText?: StringNullableFilter<"Campaign"> | string | null
    fromName?: StringFilter<"Campaign"> | string
    fromEmail?: StringFilter<"Campaign"> | string
    designJson?: StringFilter<"Campaign"> | string
    html?: StringFilter<"Campaign"> | string
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    scheduledAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    startedAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    clubId?: StringFilter<"Campaign"> | string
    emailListId?: StringFilter<"Campaign"> | string
    createdById?: StringFilter<"Campaign"> | string
  }

  export type UserCreateWithoutClubsCreatedInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMemberCreateNestedManyWithoutUserInput
    campaignsCreated?: CampaignCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutClubsCreatedInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMemberUncheckedCreateNestedManyWithoutUserInput
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutClubsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClubsCreatedInput, UserUncheckedCreateWithoutClubsCreatedInput>
  }

  export type ClubMemberCreateWithoutClubInput = {
    id?: string
    role: $Enums.ClubRole
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClubMembershipsInput
  }

  export type ClubMemberUncheckedCreateWithoutClubInput = {
    id?: string
    role: $Enums.ClubRole
    createdAt?: Date | string
    userId: string
  }

  export type ClubMemberCreateOrConnectWithoutClubInput = {
    where: ClubMemberWhereUniqueInput
    create: XOR<ClubMemberCreateWithoutClubInput, ClubMemberUncheckedCreateWithoutClubInput>
  }

  export type ClubMemberCreateManyClubInputEnvelope = {
    data: ClubMemberCreateManyClubInput | ClubMemberCreateManyClubInput[]
    skipDuplicates?: boolean
  }

  export type ClubSettingsCreateWithoutClubInput = {
    id?: string
    fromName: string
    fromEmail: string
    replyToEmail?: string | null
    defaultSubjectPrefix?: string | null
    footerText?: string | null
    physicalAddress?: string | null
  }

  export type ClubSettingsUncheckedCreateWithoutClubInput = {
    id?: string
    fromName: string
    fromEmail: string
    replyToEmail?: string | null
    defaultSubjectPrefix?: string | null
    footerText?: string | null
    physicalAddress?: string | null
  }

  export type ClubSettingsCreateOrConnectWithoutClubInput = {
    where: ClubSettingsWhereUniqueInput
    create: XOR<ClubSettingsCreateWithoutClubInput, ClubSettingsUncheckedCreateWithoutClubInput>
  }

  export type EmailListCreateWithoutClubInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    memberships?: SubscriberListMembershipCreateNestedManyWithoutEmailListInput
    campaigns?: CampaignCreateNestedManyWithoutEmailListInput
  }

  export type EmailListUncheckedCreateWithoutClubInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    memberships?: SubscriberListMembershipUncheckedCreateNestedManyWithoutEmailListInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutEmailListInput
  }

  export type EmailListCreateOrConnectWithoutClubInput = {
    where: EmailListWhereUniqueInput
    create: XOR<EmailListCreateWithoutClubInput, EmailListUncheckedCreateWithoutClubInput>
  }

  export type EmailListCreateManyClubInputEnvelope = {
    data: EmailListCreateManyClubInput | EmailListCreateManyClubInput[]
    skipDuplicates?: boolean
  }

  export type SubscriberCreateWithoutClubInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    listMemberships?: SubscriberListMembershipCreateNestedManyWithoutSubscriberInput
    emailEvents?: EmailEventCreateNestedManyWithoutSubscriberInput
  }

  export type SubscriberUncheckedCreateWithoutClubInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    listMemberships?: SubscriberListMembershipUncheckedCreateNestedManyWithoutSubscriberInput
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutSubscriberInput
  }

  export type SubscriberCreateOrConnectWithoutClubInput = {
    where: SubscriberWhereUniqueInput
    create: XOR<SubscriberCreateWithoutClubInput, SubscriberUncheckedCreateWithoutClubInput>
  }

  export type SubscriberCreateManyClubInputEnvelope = {
    data: SubscriberCreateManyClubInput | SubscriberCreateManyClubInput[]
    skipDuplicates?: boolean
  }

  export type CampaignCreateWithoutClubInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailList: EmailListCreateNestedOneWithoutCampaignsInput
    createdBy: UserCreateNestedOneWithoutCampaignsCreatedInput
    emailEvents?: EmailEventCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutClubInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailListId: string
    createdById: string
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutClubInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutClubInput, CampaignUncheckedCreateWithoutClubInput>
  }

  export type CampaignCreateManyClubInputEnvelope = {
    data: CampaignCreateManyClubInput | CampaignCreateManyClubInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutClubsCreatedInput = {
    update: XOR<UserUpdateWithoutClubsCreatedInput, UserUncheckedUpdateWithoutClubsCreatedInput>
    create: XOR<UserCreateWithoutClubsCreatedInput, UserUncheckedCreateWithoutClubsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClubsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClubsCreatedInput, UserUncheckedUpdateWithoutClubsCreatedInput>
  }

  export type UserUpdateWithoutClubsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMemberUpdateManyWithoutUserNestedInput
    campaignsCreated?: CampaignUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutClubsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMemberUncheckedUpdateManyWithoutUserNestedInput
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type ClubMemberUpsertWithWhereUniqueWithoutClubInput = {
    where: ClubMemberWhereUniqueInput
    update: XOR<ClubMemberUpdateWithoutClubInput, ClubMemberUncheckedUpdateWithoutClubInput>
    create: XOR<ClubMemberCreateWithoutClubInput, ClubMemberUncheckedCreateWithoutClubInput>
  }

  export type ClubMemberUpdateWithWhereUniqueWithoutClubInput = {
    where: ClubMemberWhereUniqueInput
    data: XOR<ClubMemberUpdateWithoutClubInput, ClubMemberUncheckedUpdateWithoutClubInput>
  }

  export type ClubMemberUpdateManyWithWhereWithoutClubInput = {
    where: ClubMemberScalarWhereInput
    data: XOR<ClubMemberUpdateManyMutationInput, ClubMemberUncheckedUpdateManyWithoutClubInput>
  }

  export type ClubSettingsUpsertWithoutClubInput = {
    update: XOR<ClubSettingsUpdateWithoutClubInput, ClubSettingsUncheckedUpdateWithoutClubInput>
    create: XOR<ClubSettingsCreateWithoutClubInput, ClubSettingsUncheckedCreateWithoutClubInput>
    where?: ClubSettingsWhereInput
  }

  export type ClubSettingsUpdateToOneWithWhereWithoutClubInput = {
    where?: ClubSettingsWhereInput
    data: XOR<ClubSettingsUpdateWithoutClubInput, ClubSettingsUncheckedUpdateWithoutClubInput>
  }

  export type ClubSettingsUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    replyToEmail?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSubjectPrefix?: NullableStringFieldUpdateOperationsInput | string | null
    footerText?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClubSettingsUncheckedUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    replyToEmail?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSubjectPrefix?: NullableStringFieldUpdateOperationsInput | string | null
    footerText?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmailListUpsertWithWhereUniqueWithoutClubInput = {
    where: EmailListWhereUniqueInput
    update: XOR<EmailListUpdateWithoutClubInput, EmailListUncheckedUpdateWithoutClubInput>
    create: XOR<EmailListCreateWithoutClubInput, EmailListUncheckedCreateWithoutClubInput>
  }

  export type EmailListUpdateWithWhereUniqueWithoutClubInput = {
    where: EmailListWhereUniqueInput
    data: XOR<EmailListUpdateWithoutClubInput, EmailListUncheckedUpdateWithoutClubInput>
  }

  export type EmailListUpdateManyWithWhereWithoutClubInput = {
    where: EmailListScalarWhereInput
    data: XOR<EmailListUpdateManyMutationInput, EmailListUncheckedUpdateManyWithoutClubInput>
  }

  export type EmailListScalarWhereInput = {
    AND?: EmailListScalarWhereInput | EmailListScalarWhereInput[]
    OR?: EmailListScalarWhereInput[]
    NOT?: EmailListScalarWhereInput | EmailListScalarWhereInput[]
    id?: StringFilter<"EmailList"> | string
    name?: StringFilter<"EmailList"> | string
    description?: StringNullableFilter<"EmailList"> | string | null
    isDefault?: BoolFilter<"EmailList"> | boolean
    createdAt?: DateTimeFilter<"EmailList"> | Date | string
    clubId?: StringFilter<"EmailList"> | string
  }

  export type SubscriberUpsertWithWhereUniqueWithoutClubInput = {
    where: SubscriberWhereUniqueInput
    update: XOR<SubscriberUpdateWithoutClubInput, SubscriberUncheckedUpdateWithoutClubInput>
    create: XOR<SubscriberCreateWithoutClubInput, SubscriberUncheckedCreateWithoutClubInput>
  }

  export type SubscriberUpdateWithWhereUniqueWithoutClubInput = {
    where: SubscriberWhereUniqueInput
    data: XOR<SubscriberUpdateWithoutClubInput, SubscriberUncheckedUpdateWithoutClubInput>
  }

  export type SubscriberUpdateManyWithWhereWithoutClubInput = {
    where: SubscriberScalarWhereInput
    data: XOR<SubscriberUpdateManyMutationInput, SubscriberUncheckedUpdateManyWithoutClubInput>
  }

  export type SubscriberScalarWhereInput = {
    AND?: SubscriberScalarWhereInput | SubscriberScalarWhereInput[]
    OR?: SubscriberScalarWhereInput[]
    NOT?: SubscriberScalarWhereInput | SubscriberScalarWhereInput[]
    id?: StringFilter<"Subscriber"> | string
    email?: StringFilter<"Subscriber"> | string
    name?: StringNullableFilter<"Subscriber"> | string | null
    status?: EnumSubscriberStatusFilter<"Subscriber"> | $Enums.SubscriberStatus
    unsubscribeToken?: StringFilter<"Subscriber"> | string
    createdAt?: DateTimeFilter<"Subscriber"> | Date | string
    updatedAt?: DateTimeFilter<"Subscriber"> | Date | string
    clubId?: StringFilter<"Subscriber"> | string
  }

  export type CampaignUpsertWithWhereUniqueWithoutClubInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutClubInput, CampaignUncheckedUpdateWithoutClubInput>
    create: XOR<CampaignCreateWithoutClubInput, CampaignUncheckedCreateWithoutClubInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutClubInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutClubInput, CampaignUncheckedUpdateWithoutClubInput>
  }

  export type CampaignUpdateManyWithWhereWithoutClubInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutClubInput>
  }

  export type ClubCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutClubsCreatedInput
    settings?: ClubSettingsCreateNestedOneWithoutClubInput
    emailLists?: EmailListCreateNestedManyWithoutClubInput
    subscribers?: SubscriberCreateNestedManyWithoutClubInput
    campaigns?: CampaignCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    settings?: ClubSettingsUncheckedCreateNestedOneWithoutClubInput
    emailLists?: EmailListUncheckedCreateNestedManyWithoutClubInput
    subscribers?: SubscriberUncheckedCreateNestedManyWithoutClubInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutMembersInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutMembersInput, ClubUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutClubMembershipsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    clubsCreated?: ClubCreateNestedManyWithoutCreatedByInput
    campaignsCreated?: CampaignCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutClubMembershipsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    clubsCreated?: ClubUncheckedCreateNestedManyWithoutCreatedByInput
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutClubMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClubMembershipsInput, UserUncheckedCreateWithoutClubMembershipsInput>
  }

  export type ClubUpsertWithoutMembersInput = {
    update: XOR<ClubUpdateWithoutMembersInput, ClubUncheckedUpdateWithoutMembersInput>
    create: XOR<ClubCreateWithoutMembersInput, ClubUncheckedCreateWithoutMembersInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutMembersInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutMembersInput, ClubUncheckedUpdateWithoutMembersInput>
  }

  export type ClubUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutClubsCreatedNestedInput
    settings?: ClubSettingsUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    settings?: ClubSettingsUncheckedUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUncheckedUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUncheckedUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutClubNestedInput
  }

  export type UserUpsertWithoutClubMembershipsInput = {
    update: XOR<UserUpdateWithoutClubMembershipsInput, UserUncheckedUpdateWithoutClubMembershipsInput>
    create: XOR<UserCreateWithoutClubMembershipsInput, UserUncheckedCreateWithoutClubMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClubMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClubMembershipsInput, UserUncheckedUpdateWithoutClubMembershipsInput>
  }

  export type UserUpdateWithoutClubMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUpdateManyWithoutCreatedByNestedInput
    campaignsCreated?: CampaignUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutClubMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUncheckedUpdateManyWithoutCreatedByNestedInput
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type ClubCreateWithoutSettingsInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutClubsCreatedInput
    members?: ClubMemberCreateNestedManyWithoutClubInput
    emailLists?: EmailListCreateNestedManyWithoutClubInput
    subscribers?: SubscriberCreateNestedManyWithoutClubInput
    campaigns?: CampaignCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutSettingsInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    members?: ClubMemberUncheckedCreateNestedManyWithoutClubInput
    emailLists?: EmailListUncheckedCreateNestedManyWithoutClubInput
    subscribers?: SubscriberUncheckedCreateNestedManyWithoutClubInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutSettingsInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutSettingsInput, ClubUncheckedCreateWithoutSettingsInput>
  }

  export type ClubUpsertWithoutSettingsInput = {
    update: XOR<ClubUpdateWithoutSettingsInput, ClubUncheckedUpdateWithoutSettingsInput>
    create: XOR<ClubCreateWithoutSettingsInput, ClubUncheckedCreateWithoutSettingsInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutSettingsInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutSettingsInput, ClubUncheckedUpdateWithoutSettingsInput>
  }

  export type ClubUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutClubsCreatedNestedInput
    members?: ClubMemberUpdateManyWithoutClubNestedInput
    emailLists?: EmailListUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    members?: ClubMemberUncheckedUpdateManyWithoutClubNestedInput
    emailLists?: EmailListUncheckedUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUncheckedUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutClubNestedInput
  }

  export type ClubCreateWithoutEmailListsInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutClubsCreatedInput
    members?: ClubMemberCreateNestedManyWithoutClubInput
    settings?: ClubSettingsCreateNestedOneWithoutClubInput
    subscribers?: SubscriberCreateNestedManyWithoutClubInput
    campaigns?: CampaignCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutEmailListsInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    members?: ClubMemberUncheckedCreateNestedManyWithoutClubInput
    settings?: ClubSettingsUncheckedCreateNestedOneWithoutClubInput
    subscribers?: SubscriberUncheckedCreateNestedManyWithoutClubInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutEmailListsInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutEmailListsInput, ClubUncheckedCreateWithoutEmailListsInput>
  }

  export type SubscriberListMembershipCreateWithoutEmailListInput = {
    subscribedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    subscriber: SubscriberCreateNestedOneWithoutListMembershipsInput
  }

  export type SubscriberListMembershipUncheckedCreateWithoutEmailListInput = {
    subscribedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    subscriberId: string
  }

  export type SubscriberListMembershipCreateOrConnectWithoutEmailListInput = {
    where: SubscriberListMembershipWhereUniqueInput
    create: XOR<SubscriberListMembershipCreateWithoutEmailListInput, SubscriberListMembershipUncheckedCreateWithoutEmailListInput>
  }

  export type SubscriberListMembershipCreateManyEmailListInputEnvelope = {
    data: SubscriberListMembershipCreateManyEmailListInput | SubscriberListMembershipCreateManyEmailListInput[]
    skipDuplicates?: boolean
  }

  export type CampaignCreateWithoutEmailListInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    club: ClubCreateNestedOneWithoutCampaignsInput
    createdBy: UserCreateNestedOneWithoutCampaignsCreatedInput
    emailEvents?: EmailEventCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutEmailListInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    createdById: string
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutEmailListInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutEmailListInput, CampaignUncheckedCreateWithoutEmailListInput>
  }

  export type CampaignCreateManyEmailListInputEnvelope = {
    data: CampaignCreateManyEmailListInput | CampaignCreateManyEmailListInput[]
    skipDuplicates?: boolean
  }

  export type ClubUpsertWithoutEmailListsInput = {
    update: XOR<ClubUpdateWithoutEmailListsInput, ClubUncheckedUpdateWithoutEmailListsInput>
    create: XOR<ClubCreateWithoutEmailListsInput, ClubUncheckedCreateWithoutEmailListsInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutEmailListsInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutEmailListsInput, ClubUncheckedUpdateWithoutEmailListsInput>
  }

  export type ClubUpdateWithoutEmailListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutClubsCreatedNestedInput
    members?: ClubMemberUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUpdateOneWithoutClubNestedInput
    subscribers?: SubscriberUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutEmailListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    members?: ClubMemberUncheckedUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUncheckedUpdateOneWithoutClubNestedInput
    subscribers?: SubscriberUncheckedUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutClubNestedInput
  }

  export type SubscriberListMembershipUpsertWithWhereUniqueWithoutEmailListInput = {
    where: SubscriberListMembershipWhereUniqueInput
    update: XOR<SubscriberListMembershipUpdateWithoutEmailListInput, SubscriberListMembershipUncheckedUpdateWithoutEmailListInput>
    create: XOR<SubscriberListMembershipCreateWithoutEmailListInput, SubscriberListMembershipUncheckedCreateWithoutEmailListInput>
  }

  export type SubscriberListMembershipUpdateWithWhereUniqueWithoutEmailListInput = {
    where: SubscriberListMembershipWhereUniqueInput
    data: XOR<SubscriberListMembershipUpdateWithoutEmailListInput, SubscriberListMembershipUncheckedUpdateWithoutEmailListInput>
  }

  export type SubscriberListMembershipUpdateManyWithWhereWithoutEmailListInput = {
    where: SubscriberListMembershipScalarWhereInput
    data: XOR<SubscriberListMembershipUpdateManyMutationInput, SubscriberListMembershipUncheckedUpdateManyWithoutEmailListInput>
  }

  export type SubscriberListMembershipScalarWhereInput = {
    AND?: SubscriberListMembershipScalarWhereInput | SubscriberListMembershipScalarWhereInput[]
    OR?: SubscriberListMembershipScalarWhereInput[]
    NOT?: SubscriberListMembershipScalarWhereInput | SubscriberListMembershipScalarWhereInput[]
    subscribedAt?: DateTimeNullableFilter<"SubscriberListMembership"> | Date | string | null
    unsubscribedAt?: DateTimeNullableFilter<"SubscriberListMembership"> | Date | string | null
    subscriberId?: StringFilter<"SubscriberListMembership"> | string
    emailListId?: StringFilter<"SubscriberListMembership"> | string
  }

  export type CampaignUpsertWithWhereUniqueWithoutEmailListInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutEmailListInput, CampaignUncheckedUpdateWithoutEmailListInput>
    create: XOR<CampaignCreateWithoutEmailListInput, CampaignUncheckedCreateWithoutEmailListInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutEmailListInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutEmailListInput, CampaignUncheckedUpdateWithoutEmailListInput>
  }

  export type CampaignUpdateManyWithWhereWithoutEmailListInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutEmailListInput>
  }

  export type ClubCreateWithoutSubscribersInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutClubsCreatedInput
    members?: ClubMemberCreateNestedManyWithoutClubInput
    settings?: ClubSettingsCreateNestedOneWithoutClubInput
    emailLists?: EmailListCreateNestedManyWithoutClubInput
    campaigns?: CampaignCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutSubscribersInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    members?: ClubMemberUncheckedCreateNestedManyWithoutClubInput
    settings?: ClubSettingsUncheckedCreateNestedOneWithoutClubInput
    emailLists?: EmailListUncheckedCreateNestedManyWithoutClubInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutSubscribersInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutSubscribersInput, ClubUncheckedCreateWithoutSubscribersInput>
  }

  export type SubscriberListMembershipCreateWithoutSubscriberInput = {
    subscribedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    emailList: EmailListCreateNestedOneWithoutMembershipsInput
  }

  export type SubscriberListMembershipUncheckedCreateWithoutSubscriberInput = {
    subscribedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    emailListId: string
  }

  export type SubscriberListMembershipCreateOrConnectWithoutSubscriberInput = {
    where: SubscriberListMembershipWhereUniqueInput
    create: XOR<SubscriberListMembershipCreateWithoutSubscriberInput, SubscriberListMembershipUncheckedCreateWithoutSubscriberInput>
  }

  export type SubscriberListMembershipCreateManySubscriberInputEnvelope = {
    data: SubscriberListMembershipCreateManySubscriberInput | SubscriberListMembershipCreateManySubscriberInput[]
    skipDuplicates?: boolean
  }

  export type EmailEventCreateWithoutSubscriberInput = {
    id?: string
    providerMessageId?: string | null
    status?: $Enums.EmailEventStatus
    errorMessage?: string | null
    timestamp?: Date | string
    campaign: CampaignCreateNestedOneWithoutEmailEventsInput
  }

  export type EmailEventUncheckedCreateWithoutSubscriberInput = {
    id?: string
    providerMessageId?: string | null
    status?: $Enums.EmailEventStatus
    errorMessage?: string | null
    timestamp?: Date | string
    campaignId: string
  }

  export type EmailEventCreateOrConnectWithoutSubscriberInput = {
    where: EmailEventWhereUniqueInput
    create: XOR<EmailEventCreateWithoutSubscriberInput, EmailEventUncheckedCreateWithoutSubscriberInput>
  }

  export type EmailEventCreateManySubscriberInputEnvelope = {
    data: EmailEventCreateManySubscriberInput | EmailEventCreateManySubscriberInput[]
    skipDuplicates?: boolean
  }

  export type ClubUpsertWithoutSubscribersInput = {
    update: XOR<ClubUpdateWithoutSubscribersInput, ClubUncheckedUpdateWithoutSubscribersInput>
    create: XOR<ClubCreateWithoutSubscribersInput, ClubUncheckedCreateWithoutSubscribersInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutSubscribersInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutSubscribersInput, ClubUncheckedUpdateWithoutSubscribersInput>
  }

  export type ClubUpdateWithoutSubscribersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutClubsCreatedNestedInput
    members?: ClubMemberUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutSubscribersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    members?: ClubMemberUncheckedUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUncheckedUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUncheckedUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutClubNestedInput
  }

  export type SubscriberListMembershipUpsertWithWhereUniqueWithoutSubscriberInput = {
    where: SubscriberListMembershipWhereUniqueInput
    update: XOR<SubscriberListMembershipUpdateWithoutSubscriberInput, SubscriberListMembershipUncheckedUpdateWithoutSubscriberInput>
    create: XOR<SubscriberListMembershipCreateWithoutSubscriberInput, SubscriberListMembershipUncheckedCreateWithoutSubscriberInput>
  }

  export type SubscriberListMembershipUpdateWithWhereUniqueWithoutSubscriberInput = {
    where: SubscriberListMembershipWhereUniqueInput
    data: XOR<SubscriberListMembershipUpdateWithoutSubscriberInput, SubscriberListMembershipUncheckedUpdateWithoutSubscriberInput>
  }

  export type SubscriberListMembershipUpdateManyWithWhereWithoutSubscriberInput = {
    where: SubscriberListMembershipScalarWhereInput
    data: XOR<SubscriberListMembershipUpdateManyMutationInput, SubscriberListMembershipUncheckedUpdateManyWithoutSubscriberInput>
  }

  export type EmailEventUpsertWithWhereUniqueWithoutSubscriberInput = {
    where: EmailEventWhereUniqueInput
    update: XOR<EmailEventUpdateWithoutSubscriberInput, EmailEventUncheckedUpdateWithoutSubscriberInput>
    create: XOR<EmailEventCreateWithoutSubscriberInput, EmailEventUncheckedCreateWithoutSubscriberInput>
  }

  export type EmailEventUpdateWithWhereUniqueWithoutSubscriberInput = {
    where: EmailEventWhereUniqueInput
    data: XOR<EmailEventUpdateWithoutSubscriberInput, EmailEventUncheckedUpdateWithoutSubscriberInput>
  }

  export type EmailEventUpdateManyWithWhereWithoutSubscriberInput = {
    where: EmailEventScalarWhereInput
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyWithoutSubscriberInput>
  }

  export type EmailEventScalarWhereInput = {
    AND?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
    OR?: EmailEventScalarWhereInput[]
    NOT?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
    id?: StringFilter<"EmailEvent"> | string
    providerMessageId?: StringNullableFilter<"EmailEvent"> | string | null
    status?: EnumEmailEventStatusFilter<"EmailEvent"> | $Enums.EmailEventStatus
    errorMessage?: StringNullableFilter<"EmailEvent"> | string | null
    timestamp?: DateTimeFilter<"EmailEvent"> | Date | string
    campaignId?: StringFilter<"EmailEvent"> | string
    subscriberId?: StringFilter<"EmailEvent"> | string
  }

  export type SubscriberCreateWithoutListMembershipsInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    club: ClubCreateNestedOneWithoutSubscribersInput
    emailEvents?: EmailEventCreateNestedManyWithoutSubscriberInput
  }

  export type SubscriberUncheckedCreateWithoutListMembershipsInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutSubscriberInput
  }

  export type SubscriberCreateOrConnectWithoutListMembershipsInput = {
    where: SubscriberWhereUniqueInput
    create: XOR<SubscriberCreateWithoutListMembershipsInput, SubscriberUncheckedCreateWithoutListMembershipsInput>
  }

  export type EmailListCreateWithoutMembershipsInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    club: ClubCreateNestedOneWithoutEmailListsInput
    campaigns?: CampaignCreateNestedManyWithoutEmailListInput
  }

  export type EmailListUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    clubId: string
    campaigns?: CampaignUncheckedCreateNestedManyWithoutEmailListInput
  }

  export type EmailListCreateOrConnectWithoutMembershipsInput = {
    where: EmailListWhereUniqueInput
    create: XOR<EmailListCreateWithoutMembershipsInput, EmailListUncheckedCreateWithoutMembershipsInput>
  }

  export type SubscriberUpsertWithoutListMembershipsInput = {
    update: XOR<SubscriberUpdateWithoutListMembershipsInput, SubscriberUncheckedUpdateWithoutListMembershipsInput>
    create: XOR<SubscriberCreateWithoutListMembershipsInput, SubscriberUncheckedCreateWithoutListMembershipsInput>
    where?: SubscriberWhereInput
  }

  export type SubscriberUpdateToOneWithWhereWithoutListMembershipsInput = {
    where?: SubscriberWhereInput
    data: XOR<SubscriberUpdateWithoutListMembershipsInput, SubscriberUncheckedUpdateWithoutListMembershipsInput>
  }

  export type SubscriberUpdateWithoutListMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutSubscribersNestedInput
    emailEvents?: EmailEventUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscriberUncheckedUpdateWithoutListMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    emailEvents?: EmailEventUncheckedUpdateManyWithoutSubscriberNestedInput
  }

  export type EmailListUpsertWithoutMembershipsInput = {
    update: XOR<EmailListUpdateWithoutMembershipsInput, EmailListUncheckedUpdateWithoutMembershipsInput>
    create: XOR<EmailListCreateWithoutMembershipsInput, EmailListUncheckedCreateWithoutMembershipsInput>
    where?: EmailListWhereInput
  }

  export type EmailListUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: EmailListWhereInput
    data: XOR<EmailListUpdateWithoutMembershipsInput, EmailListUncheckedUpdateWithoutMembershipsInput>
  }

  export type EmailListUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutEmailListsNestedInput
    campaigns?: CampaignUpdateManyWithoutEmailListNestedInput
  }

  export type EmailListUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    campaigns?: CampaignUncheckedUpdateManyWithoutEmailListNestedInput
  }

  export type ClubCreateWithoutCampaignsInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutClubsCreatedInput
    members?: ClubMemberCreateNestedManyWithoutClubInput
    settings?: ClubSettingsCreateNestedOneWithoutClubInput
    emailLists?: EmailListCreateNestedManyWithoutClubInput
    subscribers?: SubscriberCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutCampaignsInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    members?: ClubMemberUncheckedCreateNestedManyWithoutClubInput
    settings?: ClubSettingsUncheckedCreateNestedOneWithoutClubInput
    emailLists?: EmailListUncheckedCreateNestedManyWithoutClubInput
    subscribers?: SubscriberUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutCampaignsInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutCampaignsInput, ClubUncheckedCreateWithoutCampaignsInput>
  }

  export type EmailListCreateWithoutCampaignsInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    club: ClubCreateNestedOneWithoutEmailListsInput
    memberships?: SubscriberListMembershipCreateNestedManyWithoutEmailListInput
  }

  export type EmailListUncheckedCreateWithoutCampaignsInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    clubId: string
    memberships?: SubscriberListMembershipUncheckedCreateNestedManyWithoutEmailListInput
  }

  export type EmailListCreateOrConnectWithoutCampaignsInput = {
    where: EmailListWhereUniqueInput
    create: XOR<EmailListCreateWithoutCampaignsInput, EmailListUncheckedCreateWithoutCampaignsInput>
  }

  export type UserCreateWithoutCampaignsCreatedInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    clubsCreated?: ClubCreateNestedManyWithoutCreatedByInput
    clubMemberships?: ClubMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCampaignsCreatedInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    clubsCreated?: ClubUncheckedCreateNestedManyWithoutCreatedByInput
    clubMemberships?: ClubMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCampaignsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCampaignsCreatedInput, UserUncheckedCreateWithoutCampaignsCreatedInput>
  }

  export type EmailEventCreateWithoutCampaignInput = {
    id?: string
    providerMessageId?: string | null
    status?: $Enums.EmailEventStatus
    errorMessage?: string | null
    timestamp?: Date | string
    subscriber: SubscriberCreateNestedOneWithoutEmailEventsInput
  }

  export type EmailEventUncheckedCreateWithoutCampaignInput = {
    id?: string
    providerMessageId?: string | null
    status?: $Enums.EmailEventStatus
    errorMessage?: string | null
    timestamp?: Date | string
    subscriberId: string
  }

  export type EmailEventCreateOrConnectWithoutCampaignInput = {
    where: EmailEventWhereUniqueInput
    create: XOR<EmailEventCreateWithoutCampaignInput, EmailEventUncheckedCreateWithoutCampaignInput>
  }

  export type EmailEventCreateManyCampaignInputEnvelope = {
    data: EmailEventCreateManyCampaignInput | EmailEventCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type ClubUpsertWithoutCampaignsInput = {
    update: XOR<ClubUpdateWithoutCampaignsInput, ClubUncheckedUpdateWithoutCampaignsInput>
    create: XOR<ClubCreateWithoutCampaignsInput, ClubUncheckedCreateWithoutCampaignsInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutCampaignsInput, ClubUncheckedUpdateWithoutCampaignsInput>
  }

  export type ClubUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutClubsCreatedNestedInput
    members?: ClubMemberUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    members?: ClubMemberUncheckedUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUncheckedUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUncheckedUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUncheckedUpdateManyWithoutClubNestedInput
  }

  export type EmailListUpsertWithoutCampaignsInput = {
    update: XOR<EmailListUpdateWithoutCampaignsInput, EmailListUncheckedUpdateWithoutCampaignsInput>
    create: XOR<EmailListCreateWithoutCampaignsInput, EmailListUncheckedCreateWithoutCampaignsInput>
    where?: EmailListWhereInput
  }

  export type EmailListUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: EmailListWhereInput
    data: XOR<EmailListUpdateWithoutCampaignsInput, EmailListUncheckedUpdateWithoutCampaignsInput>
  }

  export type EmailListUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutEmailListsNestedInput
    memberships?: SubscriberListMembershipUpdateManyWithoutEmailListNestedInput
  }

  export type EmailListUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    memberships?: SubscriberListMembershipUncheckedUpdateManyWithoutEmailListNestedInput
  }

  export type UserUpsertWithoutCampaignsCreatedInput = {
    update: XOR<UserUpdateWithoutCampaignsCreatedInput, UserUncheckedUpdateWithoutCampaignsCreatedInput>
    create: XOR<UserCreateWithoutCampaignsCreatedInput, UserUncheckedCreateWithoutCampaignsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCampaignsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCampaignsCreatedInput, UserUncheckedUpdateWithoutCampaignsCreatedInput>
  }

  export type UserUpdateWithoutCampaignsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUpdateManyWithoutCreatedByNestedInput
    clubMemberships?: ClubMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCampaignsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUncheckedUpdateManyWithoutCreatedByNestedInput
    clubMemberships?: ClubMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EmailEventUpsertWithWhereUniqueWithoutCampaignInput = {
    where: EmailEventWhereUniqueInput
    update: XOR<EmailEventUpdateWithoutCampaignInput, EmailEventUncheckedUpdateWithoutCampaignInput>
    create: XOR<EmailEventCreateWithoutCampaignInput, EmailEventUncheckedCreateWithoutCampaignInput>
  }

  export type EmailEventUpdateWithWhereUniqueWithoutCampaignInput = {
    where: EmailEventWhereUniqueInput
    data: XOR<EmailEventUpdateWithoutCampaignInput, EmailEventUncheckedUpdateWithoutCampaignInput>
  }

  export type EmailEventUpdateManyWithWhereWithoutCampaignInput = {
    where: EmailEventScalarWhereInput
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignCreateWithoutEmailEventsInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    club: ClubCreateNestedOneWithoutCampaignsInput
    emailList: EmailListCreateNestedOneWithoutCampaignsInput
    createdBy: UserCreateNestedOneWithoutCampaignsCreatedInput
  }

  export type CampaignUncheckedCreateWithoutEmailEventsInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    emailListId: string
    createdById: string
  }

  export type CampaignCreateOrConnectWithoutEmailEventsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutEmailEventsInput, CampaignUncheckedCreateWithoutEmailEventsInput>
  }

  export type SubscriberCreateWithoutEmailEventsInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    club: ClubCreateNestedOneWithoutSubscribersInput
    listMemberships?: SubscriberListMembershipCreateNestedManyWithoutSubscriberInput
  }

  export type SubscriberUncheckedCreateWithoutEmailEventsInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    listMemberships?: SubscriberListMembershipUncheckedCreateNestedManyWithoutSubscriberInput
  }

  export type SubscriberCreateOrConnectWithoutEmailEventsInput = {
    where: SubscriberWhereUniqueInput
    create: XOR<SubscriberCreateWithoutEmailEventsInput, SubscriberUncheckedCreateWithoutEmailEventsInput>
  }

  export type CampaignUpsertWithoutEmailEventsInput = {
    update: XOR<CampaignUpdateWithoutEmailEventsInput, CampaignUncheckedUpdateWithoutEmailEventsInput>
    create: XOR<CampaignCreateWithoutEmailEventsInput, CampaignUncheckedCreateWithoutEmailEventsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutEmailEventsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutEmailEventsInput, CampaignUncheckedUpdateWithoutEmailEventsInput>
  }

  export type CampaignUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutCampaignsNestedInput
    emailList?: EmailListUpdateOneRequiredWithoutCampaignsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
  }

  export type CampaignUncheckedUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    emailListId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberUpsertWithoutEmailEventsInput = {
    update: XOR<SubscriberUpdateWithoutEmailEventsInput, SubscriberUncheckedUpdateWithoutEmailEventsInput>
    create: XOR<SubscriberCreateWithoutEmailEventsInput, SubscriberUncheckedCreateWithoutEmailEventsInput>
    where?: SubscriberWhereInput
  }

  export type SubscriberUpdateToOneWithWhereWithoutEmailEventsInput = {
    where?: SubscriberWhereInput
    data: XOR<SubscriberUpdateWithoutEmailEventsInput, SubscriberUncheckedUpdateWithoutEmailEventsInput>
  }

  export type SubscriberUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutSubscribersNestedInput
    listMemberships?: SubscriberListMembershipUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscriberUncheckedUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    listMemberships?: SubscriberListMembershipUncheckedUpdateManyWithoutSubscriberNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    clubsCreated?: ClubCreateNestedManyWithoutCreatedByInput
    clubMemberships?: ClubMemberCreateNestedManyWithoutUserInput
    campaignsCreated?: CampaignCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    clubsCreated?: ClubUncheckedCreateNestedManyWithoutCreatedByInput
    clubMemberships?: ClubMemberUncheckedCreateNestedManyWithoutUserInput
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUpdateManyWithoutCreatedByNestedInput
    clubMemberships?: ClubMemberUpdateManyWithoutUserNestedInput
    campaignsCreated?: CampaignUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUncheckedUpdateManyWithoutCreatedByNestedInput
    clubMemberships?: ClubMemberUncheckedUpdateManyWithoutUserNestedInput
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    clubsCreated?: ClubCreateNestedManyWithoutCreatedByInput
    clubMemberships?: ClubMemberCreateNestedManyWithoutUserInput
    campaignsCreated?: CampaignCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    clubsCreated?: ClubUncheckedCreateNestedManyWithoutCreatedByInput
    clubMemberships?: ClubMemberUncheckedCreateNestedManyWithoutUserInput
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUpdateManyWithoutCreatedByNestedInput
    clubMemberships?: ClubMemberUpdateManyWithoutUserNestedInput
    campaignsCreated?: CampaignUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    clubsCreated?: ClubUncheckedUpdateManyWithoutCreatedByNestedInput
    clubMemberships?: ClubMemberUncheckedUpdateManyWithoutUserNestedInput
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClubCreateManyCreatedByInput = {
    id?: string
    name: string
    slug: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClubMemberCreateManyUserInput = {
    id?: string
    role: $Enums.ClubRole
    createdAt?: Date | string
    clubId: string
  }

  export type CampaignCreateManyCreatedByInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    emailListId: string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ClubMemberUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ClubMemberUncheckedUpdateManyWithoutClubNestedInput
    settings?: ClubSettingsUncheckedUpdateOneWithoutClubNestedInput
    emailLists?: EmailListUncheckedUpdateManyWithoutClubNestedInput
    subscribers?: SubscriberUncheckedUpdateManyWithoutClubNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ClubMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
  }

  export type ClubMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
  }

  export type CampaignUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutCampaignsNestedInput
    emailList?: EmailListUpdateOneRequiredWithoutCampaignsNestedInput
    emailEvents?: EmailEventUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    emailListId?: StringFieldUpdateOperationsInput | string
    emailEvents?: EmailEventUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    emailListId?: StringFieldUpdateOperationsInput | string
  }

  export type ClubMemberCreateManyClubInput = {
    id?: string
    role: $Enums.ClubRole
    createdAt?: Date | string
    userId: string
  }

  export type EmailListCreateManyClubInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type SubscriberCreateManyClubInput = {
    id?: string
    email: string
    name?: string | null
    status?: $Enums.SubscriberStatus
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignCreateManyClubInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailListId: string
    createdById: string
  }

  export type ClubMemberUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClubMembershipsNestedInput
  }

  export type ClubMemberUncheckedUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ClubMemberUncheckedUpdateManyWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type EmailListUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: SubscriberListMembershipUpdateManyWithoutEmailListNestedInput
    campaigns?: CampaignUpdateManyWithoutEmailListNestedInput
  }

  export type EmailListUncheckedUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: SubscriberListMembershipUncheckedUpdateManyWithoutEmailListNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutEmailListNestedInput
  }

  export type EmailListUncheckedUpdateManyWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriberUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listMemberships?: SubscriberListMembershipUpdateManyWithoutSubscriberNestedInput
    emailEvents?: EmailEventUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscriberUncheckedUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listMemberships?: SubscriberListMembershipUncheckedUpdateManyWithoutSubscriberNestedInput
    emailEvents?: EmailEventUncheckedUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscriberUncheckedUpdateManyWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriberStatusFieldUpdateOperationsInput | $Enums.SubscriberStatus
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailList?: EmailListUpdateOneRequiredWithoutCampaignsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
    emailEvents?: EmailEventUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailListId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    emailEvents?: EmailEventUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutClubInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailListId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberListMembershipCreateManyEmailListInput = {
    subscribedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    subscriberId: string
  }

  export type CampaignCreateManyEmailListInput = {
    id?: string
    name: string
    subject: string
    preheaderText?: string | null
    fromName: string
    fromEmail: string
    designJson: string
    html: string
    status?: $Enums.CampaignStatus
    scheduledAt?: Date | string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clubId: string
    createdById: string
  }

  export type SubscriberListMembershipUpdateWithoutEmailListInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriber?: SubscriberUpdateOneRequiredWithoutListMembershipsNestedInput
  }

  export type SubscriberListMembershipUncheckedUpdateWithoutEmailListInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriberId?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberListMembershipUncheckedUpdateManyWithoutEmailListInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriberId?: StringFieldUpdateOperationsInput | string
  }

  export type CampaignUpdateWithoutEmailListInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutCampaignsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
    emailEvents?: EmailEventUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutEmailListInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    emailEvents?: EmailEventUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutEmailListInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    preheaderText?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    designJson?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clubId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberListMembershipCreateManySubscriberInput = {
    subscribedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    emailListId: string
  }

  export type EmailEventCreateManySubscriberInput = {
    id?: string
    providerMessageId?: string | null
    status?: $Enums.EmailEventStatus
    errorMessage?: string | null
    timestamp?: Date | string
    campaignId: string
  }

  export type SubscriberListMembershipUpdateWithoutSubscriberInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: EmailListUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type SubscriberListMembershipUncheckedUpdateWithoutSubscriberInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailListId?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberListMembershipUncheckedUpdateManyWithoutSubscriberInput = {
    subscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailListId?: StringFieldUpdateOperationsInput | string
  }

  export type EmailEventUpdateWithoutSubscriberInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutEmailEventsNestedInput
  }

  export type EmailEventUncheckedUpdateWithoutSubscriberInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignId?: StringFieldUpdateOperationsInput | string
  }

  export type EmailEventUncheckedUpdateManyWithoutSubscriberInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignId?: StringFieldUpdateOperationsInput | string
  }

  export type EmailEventCreateManyCampaignInput = {
    id?: string
    providerMessageId?: string | null
    status?: $Enums.EmailEventStatus
    errorMessage?: string | null
    timestamp?: Date | string
    subscriberId: string
  }

  export type EmailEventUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriber?: SubscriberUpdateOneRequiredWithoutEmailEventsNestedInput
  }

  export type EmailEventUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriberId?: StringFieldUpdateOperationsInput | string
  }

  export type EmailEventUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmailEventStatusFieldUpdateOperationsInput | $Enums.EmailEventStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriberId?: StringFieldUpdateOperationsInput | string
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