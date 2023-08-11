import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import Users from "~/features/core/users/domain/entity/users";
import Tables from "../tables";

const meta: Meta<typeof Tables> = {
  title: "Users/Table",
  argTypes: {
    data: {
      control: { type: "object" },
    },
  },
  component: Tables,
  args: {
    data: [
      new Users({
        id: "1",
        name: "John",
        email: "Doe",
      }),
    ],
  },
  decorators: [withRouter],
};
export default meta;

type Story = StoryObj<typeof Tables>;

export const Primary: Story = {
  render: (props) => <Tables data={props.data} />,
};
