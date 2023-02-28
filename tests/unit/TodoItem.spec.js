import { shallowMount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";

describe("TodoItem.vue", () => {
  const testProps = {
    id: 1,
    text: "Text",
    dueDate: "2023-10-10",
    color: "#C8E6C9",
    show: Function(),
    currentTodo: Function(),
    deleteTodo: Function(),
  };
  it("renders text set by prop", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: testProps,
    });
    expect(wrapper.text()).toMatch(testProps.text);
    expect(wrapper.text()).toMatch(testProps.dueDate);
  });
  it("renders attribute set by prop", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: testProps,
    });
    expect(wrapper.attributes().color).toBe(testProps.color);
  });
});
