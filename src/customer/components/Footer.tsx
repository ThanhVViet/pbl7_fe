import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Facebook, Instagram, LinkedIn, X, YouTube} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate()
  return (
    <footer className="bg-[#00927c] text-white px-6 py-10">
      <div className="max-w-[2000px] mx-auto flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Column */}
        <div className="flex flex-col lg:flex-row gap-12">
          <div>
            <h3 className="uppercase text-lg border-b border-white mb-4">Hệ thống cửa hàng</h3>
            <p className="mb-2 flex items-center gap-2">
              <LocationOnIcon /> 2B Phổ Quang, Phường 2 Q. Tân Bình, Tp. Hồ Chí Minh
            </p>
            <p className="flex items-center gap-2">
              <LocationOnIcon /> 108 Phố Hoàng Như Tiếp, P.Bồ Đề, Q. Long Biên, Tp. Hà Nội
            </p>
          </div>

               <div>
            <h3 className="uppercase text-lg border-b border-white mb-4">Chính sách</h3>
            <p className="mb-2 flex items-center gap-2">Chính sách giao hàng</p>

            <p className="mb-2 flex items-center gap-2">Chính sách bảo hành</p>
            <p className="mb-2 flex items-center gap-2">Chính sách bảo mật</p>

          </div>

          <div>
            <h3 className="uppercase text-lg border-b border-white mb-4">Đường dây liên hệ</h3>
            <div className="ml-4">
              <p className="mb-2">024 7106 6858</p>
            </div>
            <div className="ml-4">
              <p>093 108 6858</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div>
            <h3 className="uppercase text-lg border-b border-white mb-4">Thông tin</h3>
            <p className="mb-2">Hướng dẫn mua hàng</p>
            <p className="mb-2">Hướng dẫn thanh toán</p>
            <p className="mb-2">Hướng dẫn trả góp</p>
          </div>

          <div>
            <h3 className="uppercase text-lg border-b border-white mb-4">Giới thiệu</h3>
            <p className="mb-2">Tuyển dụng</p>
            <p>Liên hệ</p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col lg:flex-row justify-between items-center max-w-[1000px] mx-auto">
        <div className="mb-4 lg:mb-0">
            <h1 onClick={() => navigate('/')} className='logo cursor-pointer text-lg md:text-2xl text-white'>
                            thanh viet
                        </h1>
        </div>
        <div className="flex gap-6 text-2xl">
          <a href="/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <Facebook />
          </a>
          <a href="/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram />
          </a>
          <a
            href="https://www.youtube.com/watch?v=AThMowOwuWs"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <YouTube />
          </a>
          <a href="/" target="_blank" rel="noreferrer" aria-label="Twitter">
            <X />
          </a>
          <a href="/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
