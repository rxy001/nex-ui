1. nextjs 在未配置 optimizePackageImports 时，会全量导入 @nex-ui/icons ？


## Extends 

` T extends U ? X : Y` 可以理解为 T 能够赋值给 U，那么类型是X，否则为Y。实际上就是 T 为 U 的子类型。

## 协变（Covariance） vs 逆变（Contravariance）

### 协变
如果类型 A 是类型 B 的子类型 `（A extends B）`，那么 `T<A>` 也是 `T<B>` 的子类型。

典型场景：函数返回值、数组、Promise 等。

```ts
interface Animal { name: string; }
interface Dog extends Animal { bark(): void; }

// 协变示例：Dog[] 是 Animal[] 的子类型
let dogs: Dog[] = [{ name: "Buddy", bark: () => "Woof!" }];
let animals: Animal[] = dogs; // ✅ OK

type A = Dog extends Animal ? true : false // true
```

### 逆变

定义：如果类型 A 是类型 B 的子类型 `（A extends B）`，那么 `T<B>` 反而是 `T<A>` 的子类型。

典型场景：函数参数。

```ts
type Fn<T> = (arg: T) => void;

// Animal 和 Dog 的关系：Dog extends Animal
let animalFn: Fn<Animal> = (animal: Animal) => console.log(animal.name);
let dogFn: Fn<Dog> = (dog: Dog) => { dog.bark(); };

// 逆变示例：Fn<Animal> 是 Fn<Dog> 的子类型！
dogFn = animalFn; // ✅ OK (因为 Animal 比 Dog 更通用)
animalFn = dogFn; // ❌ Error (缺少 bark() 的保证)

type B = Fn<Animal> extends Fn<Dog> ? true : false // true

// 可以变相理解为 Fn<A> 要赋值给 Fn<B>，那么 B 必须为 A 的子类型。
```

### 为什么函数参数是逆变的？

假设函数参数是协变的（即允许 `Fn<Dog>` 赋值给 `Fn<Animal>`）：

```ts

let dogFn: Fn<Dog> = (dog: Dog) => { dog.bark(); };
let animalFn: Fn<Animal> = dogFn; // 假设允许协变（ts实际会报错）

// 调用时传入一个普通的 Animal（没有 bark 方法）
animalFn({ name: "Cat" }); // 💥 运行时错误：dog.bark is not a function！
```
这会导致运行时错误，因为 `animalFn` 内部试图调用 `bark()`，但传入的参数可能只是一个普通的 `Animal`。

#### 逆变的合理性
反过来，如果允许 `Fn<Animal>` 赋值给 `Fn<Dog>`（即逆变）：

```ts
let animalFn: Fn<Animal> = (animal: Animal) => console.log(animal.name);
let dogFn: Fn<Dog> = animalFn; // ✅ 逆变是安全的

dogFn({ name: "Buddy", bark: () => "Woof!" }); // 安全：只需要 name 属性
```

这是安全的，因为 `animalFn` 只需要 `Animal` 的属性，而传入的 `Dog` 一定包含 `Animal` 的所有属性。


### 将联合类型转化为交叉类型

利用函数参数的逆变性，将 `|` 改为 `&`

```ts
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;

type F1 = () => "foo"
type F2 = (i: 42) => true

// F1 & F2
type Intersection = UnionToIntersection<F1 | F2>
```
首先通过分布式条件类型，将联合类型 U 转为由函数（参数为 U 中的类型）组成的联合类型，即

```ts
Fn<F1> | Fn<F2> extends (arg: infer I) => void ? I : never; 
```

由之前可知 `F<A> extends F<B>` 成立的条件为 B 能够赋值给 A，那么 `I` 必须能够同时赋值给 F1 和 F2，
因此也只有 `I` 为 `F1 & F2` 满足。

https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-function-parameters-bivariant

https://www.typescriptlang.org/docs/handbook/type-compatibility.html#function-parameter-bivariance