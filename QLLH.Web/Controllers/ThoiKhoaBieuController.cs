using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QLLH.Web.Controllers
{
    using BLL;
    using DAL;
    using Common.Req;
    using Common.Rsp;

    [Route("api/[controller]")]
    [ApiController]
    public class ThoiKhoaBieuController : ControllerBase
    {
        public ThoiKhoaBieuController()
        {
            _svc = new ThoiKhoaBieuSvc();
        }

        [HttpPost("get-by-class")]
        public IActionResult getThoiKhoaBieuTheoLop([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var tkb = _svc.getThoiKhoaBieuTheoLop(req.Id);
            res.Data = tkb;
            return Ok(res);
        }

        [HttpPost("get-by-teacher")]
        public IActionResult getThoiKhoaBieuTheoGiaoVien([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var tkb = _svc.getThoiKhoaBieuTheoGiaoVien(req.Id);
            res.Data = tkb;
            return Ok(res);
        }

        [HttpPost("get-by-class-and-hour")]
        public IActionResult getThoiKhoaBieuTheoTietHocVaLopHoc([FromBody] LopVaTietReq req)
        {
            var res = new SingleRsp();
            var tkb = _svc.getThoiKhoaBieuTheoTietHocVaLopHoc(req.MaTiet, req.MaLop);
            res.Data = tkb;
            return Ok(res);
        }

        private readonly ThoiKhoaBieuSvc _svc;
    }
}