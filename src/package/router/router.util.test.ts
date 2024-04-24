import { parseSearchParams, stringfySearchParams, stringfyPathname } from "./router.util";
describe("parseSearchParams 테스트", () => {
  it("쿼리스트링 문자열을 객체로 변환할 수 있습니다.", () => {
    const parse = parseSearchParams<{ test: string }>("test=hello");
    expect(parse).toEqual({ test: "hello" });
  });

  it("물음표를 제거합니다.", () => {
    const parse = parseSearchParams<{ test: string }>("?test=hello");
    expect(parse).toEqual({ test: "hello" });
  });
  it("물음표는 단 한번만 제거합니다..", () => {
    const parse = parseSearchParams<{ "?test": string }>("??test=hello");
    expect(parse).toEqual({ "?test": "hello" });
  });

  it("물음표 문자열의 맨 앞에 온 경우만 삭제합니다.", () => {
    const parse = parseSearchParams<{ test: string }>("test=hello?");
    expect(parse).toEqual({ test: "hello?" });
  });

  it("&를 통해 구분된 쿼리스트링을 적절하게 파싱합니다.", () => {
    const parse = parseSearchParams<{ test: string; hi: string }>("test=hello&hi=val");
    expect(parse).toEqual({ test: "hello", hi: "val" });
  });

  it("?가 앞에 붙은 쿼리스트링도 적절하게 &를 기준으로 파싱합니다.", () => {
    const parse = parseSearchParams<{ test: string; hi: string }>("?test=hello&hi=val");
    expect(parse).toEqual({ test: "hello", hi: "val" });
  });
  it("동일한 키가 들어오는 경우를 잘 파싱합니다.", () => {
    expect(parseSearchParams("he=hello&he=world")).toEqual({ he: ["hello", "world"] });
  });
  it("중첩 객체여야하는 경우를 잘 파싱합니다.", () => {
    expect(parseSearchParams("he%5Bshe%5D=hello")).toEqual({ he: { she: "hello" } });
  });
});

describe("objToSearchParams Test", () => {
  it("평범한 문자열 밸류를 잘 변환합니다.", () => {
    expect(stringfySearchParams({ he: "hello" })).toBe("he=hello");
  });

  it("평범한 문자열 밸류를 잘 변환합니다.", () => {
    expect(stringfySearchParams({ he: ["hello", "world"] })).toBe("he=hello&he=world");
  });

  it("중첩객체도 잘 변환합니다.", () => {
    expect(stringfySearchParams({ he: { she: "hello" } })).toBe("he%5Bshe%5D=hello");
  });
});

describe("stringfy pathname test", () => {
  it("아무것도 입력받지 않으면 빈 문자열을 리턴합니다.", () => {
    expect(stringfyPathname([])).toBe("");
    expect(stringfyPathname()).toBe("");
  });
  it("입력이 있으면 path를 반환합니다.", () => {
    expect(stringfyPathname(["hello"])).toBe("hello");
  });
  it("길이가 긴 path를 입력받으면 이를 반영합니다.", () => {
    expect(stringfyPathname(["hello", "world"])).toBe("hello/world");
    expect(stringfyPathname(["hello", "world", "hi"])).toBe("hello/world/hi");
  });
});
