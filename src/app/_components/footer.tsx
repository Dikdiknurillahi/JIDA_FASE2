import { LinkedinOutlined, InstagramOutlined, GithubOutlined } from '@ant-design/icons';

export function Footer() {
  return (
    <section
    className="h-[13rem] bg-sage content-center"
    >
      <div
      className="mx-30"
      >
        <h1
        className="font-semibold text-3xl"
        >PetaniMuda</h1>
        <p>Dari Petani Muda, untuk Pangan Indonesia.</p>
      </div>
    </section>
  );
}

export function CopyRight() {
  return (
    <section
    className="bg-sage flex justify-between px-30"
    >
      <p className="py-2">©2025 Dik Dik Nur Illahi</p>
      <div className="flex">
        <a target="blank" href="https://github.com/Dikdiknurillahi">
          <GithubOutlined style={{ fontSize: '40px'}} />
        </a>
        <a target="blank" href="https://www.linkedin.com/in/dikdiknurillahi204/">
          <LinkedinOutlined style={{ fontSize: '40px'}} />
        </a>
        <a target="blank" href="https://www.instagram.com/itsyourdik_/">
          <InstagramOutlined style={{ fontSize: '40px'}} />
        </a>
      </div>
    </section>
  );
}