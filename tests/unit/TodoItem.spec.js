import { shallowMount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";

describe("TodoItem.vue", () => {
  it("renders text set by prop", () => {
    const text = "Text";
    const dueDate = "2023-01-01";
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        text: text,
        dueDate: dueDate,
      },
    });
    expect(wrapper.text()).toMatch(text);
    expect(wrapper.text()).toMatch(dueDate);
  });
  it("renders attribute set by prop", () => {
    const color = "#C8E6C9";
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        color: color,
      },
    });
    expect(wrapper.attributes().color).toBe(color);
  });
});
