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
    using QLLH.DAL.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class HocSinhController : ControllerBase
    {
        public HocSinhController()
        {
            _svc = new HocSinhSvc();
        }

        [HttpPost("get-by-id")]
        public IActionResult getHocSinhById([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var hs = _svc.getHocSinhById(req.Id);
            res.Data = hs;
            return Ok(res);
        }

        [HttpPost("get-by-name")]
        public IActionResult getHocSinhByName([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var hs = _svc.getHocSinhByName(req.page, req.size, req.keyword);
            res.Data = hs;
            return Ok(res);
        }

        [HttpPost("get-by-class")]
        public IActionResult getHocSinhByLop([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var hs = _svc.getHocSinhByLop(req.page, req.size, req.keyword);
            res.Data = hs;
            return Ok(res);
        }

        [HttpPost("get-by-teacher")]
        public IActionResult getHocSinhByGiaoVien([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var listHS = _svc.getHocSinhByGiaoVien(req.Id, req.Keyword);
            res.Data = listHS;
            return Ok(res);
        }

        [HttpPost("get-all")]
        public IActionResult getAllHocSinh([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var hs = _svc.getAllHocSinh(req.page, req.size, req.keyword);
            res.Data = hs;
            return Ok(res);
        }

        [HttpPost("get-all-no-detail")]
        public IActionResult getAllHocSinhNoDetail()
        {
            var res = new SingleRsp();
            var hs = _svc.getAllHocSinhNoDetail();
            res.Data = hs;
            return Ok(res);
        }

        [HttpPost("create")]
        public IActionResult createHocSinh([FromBody] HocSinhReq req)
        {
            var res = _svc.createHocSinh(req);
            return Ok(res);
        }

        [HttpPost("update")]
        public IActionResult updateHocSinh([FromBody] HocSinhReq req)
        {
            var res = _svc.updateHocSinh(req);
            return Ok(res);
        }

        [HttpPost("update-form-teacher")]
        public IActionResult updateGiaoVienChuNhiemHocSinh([FromBody] UpdateGVCNHSReq req)
        {
            var res = _svc.updateGiaoVienChuNhiemHocSinh(req.MaGvOld, req.MaGvNew);
            return Ok(res);
        }

        [HttpPost("remove")]
        public IActionResult removeHocSinh([FromBody] SimpleReq req)
        {
            var res = _svc.removeHocSinh(req.Id);
            return Ok(res);
        }

        private readonly HocSinhSvc _svc;
    }
}