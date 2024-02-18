import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, List, Space } from "antd";
import axios from "axios";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const BlogDisplay = ({ clubId }) => {
  const [blogs, setBlogs] = useState([]);

  const allBlogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/general/blogs/${clubId}`
      );
      console.log(response.data.blogs);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allBlogs();
  }, []);

  return (
    <>
      <h1>{clubId}</h1>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={blogs}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </>
  );
};

export default BlogDisplay;
