using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.BLL;
using QLLH.Common.Rsp;
using System.Linq;

namespace QLLH.BLL
{
    using DAL;
    using DAL.Models;
    using QLLH.Common.Req;
    public class GiaoVienLopSvc : GenericSvc<GiaoVienLopRep, GiaoVienLop>
    {
        public override SingleRsp Read(int id)
        {
            var res = new SingleRsp();
            var m = _rep.Read(id);
            res.Data = m;
            return res;
        }
        public object getGiaoVienLopTheoLop(int page, int size, string keyword)
        {
            var listGV = All.Join(_rep.Context.Lop, a => a.MaLop, b => b.MaLop, (a, b) => new {
                a.MaGvl,
                a.MaGv,
                b.TenLop
            }).Join(_rep.Context.GiaoVien, a => a.MaGv, c => c.MaGv, (a, c) => new {
                a.MaGvl,
                a.MaGv,
                c.TenGv,
                c.MaMh,
                c.MaLop,
                c.NgaySinh,
                c.GioiTinh,
                c.DiaChi,
                c.SoDt,
                c.MaCv,
                a.TenLop
            }).Join(_rep.Context.MonHoc, a => a.MaMh, d => d.MaMh, (a, d) => new {
                a.MaGvl,
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                a.MaCv,
                a.TenLop,
                d.TenMh
            }).Where(gv => gv.TenLop == keyword).ToList();

            var offset = (page - 1) * size;
            var totalRecord = listGV.Count();
            var totalPage = (totalRecord % size) == 0 ? (int)(totalRecord / size) : (int)((totalRecord / size) + 1);
            var data = listGV.Skip(offset).Take(size).ToList();

            var res = new
            {
                Data = data,
                totalRecord = totalRecord,
                totalPage = totalPage,
                page = page,
                size = size
            };

            return res;
        }

        public object getGiaoVienLopTheoGiaoVienVaLop(GiaoVienLopReq req)
        {
            var listGVL = All.Where(gvl => gvl.MaGv == req.MaGv && gvl.MaLop == req.MaLop);
            return listGVL;
        }

        public SingleRsp createGiaoVienLop(GiaoVienLopReq gvl)
        {
            var res = new SingleRsp();
            GiaoVienLop newGVL = new GiaoVienLop();
            newGVL.MaGvl = gvl.MaGvl;
            newGVL.MaGv = gvl.MaGv;
            newGVL.MaLop = gvl.MaLop;

            res = _rep.CreateGiaoVienLop(newGVL);
            //res.Data = newGV;
            return res;
        }

        public SingleRsp updateGiaoVienLop(GiaoVienLopReq gvl)
        {
            var res = new SingleRsp();
            GiaoVienLop newGVL = new GiaoVienLop();
            newGVL.MaGvl = gvl.MaGvl;
            newGVL.MaGv = gvl.MaGv;
            newGVL.MaLop = gvl.MaLop;

            res = _rep.UpdateGiaoVienLop(newGVL);
            //res.Data = newGV;
            return res;
        }

        public SingleRsp removeGiaoVienLop(int id)
        {
            var res = new SingleRsp();
            var gvl = All.FirstOrDefault(gvl => gvl.MaGvl == id);
            res = _rep.RemoveGiaoVienLop(gvl);
            return res;
        }
    }
}
