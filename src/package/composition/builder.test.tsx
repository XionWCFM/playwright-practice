import React, { PropsWithChildren, ReactNode } from "react";
import { render, renderHook, screen } from "@testing-library/react";
import * as builder from "./builder";
import userEvent from "@testing-library/user-event";

describe("builder provider의 동작을 테스트합니다.", () => {
  it("builder provider의 해피케이스일때의 동작을 테스트합니다.", () => {
    const Component = ({ name, children }: { name: string; children?: ReactNode }) => (
      <div>
        <div className="">{name}</div>
        <div className="">{children}</div>
      </div>
    );
    const [Provider, prop] = builder.provider(Component, { name: "hello" });
    render(<Provider {...prop}>자식</Provider>);
    expect(screen.getByText(/hello/)).toBeInTheDocument();
    expect(screen.getByText(/자식/)).toBeInTheDocument();
  });
  it("builder Provder는 함수도 인수로 넘겨받을 수 있습니다.", async () => {
    const onClick = jest.fn();
    const Component = ({ onClick, name, children }: { onClick?: () => void; name: string; children?: ReactNode }) => {
      return (
        <button data-testid="1" onClick={() => onClick?.()}>
          {name}
        </button>
      );
    };
    const [Provider, prop] = builder.provider(Component, { name: "hello", onClick: onClick });
    render(<Provider {...prop}>자식</Provider>);
    await userEvent.click(screen.getByText(/hello/));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("builder Tree의 동작을 테스트합니다.", () => {
  it("builder Tree는 맨마지막 배열요소부터 래핑을 시작합니다.", async () => {
    const Component = ({ id, children }: { id: string; children?: ReactNode }) => (
      <div data-testid={id}>{children}</div>
    );
    const CompositionProvider = builder.tree([
      builder.provider(Component, { id: "1" }),
      builder.provider(Component, { id: "2" }),
      builder.provider(Component, { id: "3" }),
      builder.provider(Component, { id: "4" }),
    ]);
    render(<CompositionProvider>helloworld</CompositionProvider>);
    const testId1 = screen.getByTestId("1");
    const testId2 = screen.getByTestId("2");
    const testId3 = screen.getByTestId("3");
    const testId4 = screen.getByTestId("4");
    expect(testId1).toContainElement(testId2);
    expect(testId2).toContainElement(testId3);
    expect(testId3).toContainElement(testId4);
  });
});

describe("builder context의 동작을 테스트합니다.", () => {
  it("리턴값은 튜플입니다.", () => {
    const [Provider, useContext] = builder.context<{ hello: string }>(null);
    render(<Provider value={null}>hello</Provider>);
    const { result } = renderHook(() => useContext(), {
      wrapper: ({ children }: PropsWithChildren) => <Provider value={{ hello: "world" }}>{children}</Provider>,
    });
    expect(result.current.hello).toBe("world");
  });
});
