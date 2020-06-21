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
        public object getGiaoVienLopTheoLop(int MaLop)
        {
            var listGV = All.Join(_rep.Context.GiaoVien, a => a.MaGv, c => c.MaGv, (a, c) => new {
                a.MaGvl,
                a.MaGv,
                a.MaLop,
                c.TenGv,
                c.MaMh,
                c.NgaySinh,
                c.GioiTinh,
                c.DiaChi,
                c.SoDt
            }).Join(_rep.Context.MonHoc, a => a.MaMh, d => d.MaMh, (a, d) => new {
                a.MaGvl,
                a.MaGv,
                a.MaLop,
                a.TenGv,
                a.MaMh,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                d.TenMh
            }).Where(gv => gv.MaLop == MaLop).ToList();

            return listGV;
        }

        public object getGiaoVienLopTheoGiaoVien(int MaGv)
        {
            var listGV = All.Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaGvl,
                a.MaGv,
                a.MaLop,
                c.TenLop
            }).Where(gv => gv.MaGv == MaGv).ToList();

            return listGV;
        }

        public object getGiaoVienLopTheoMonHocVaLop(GiaoVienMonHocReq req)
        {
            var gv = All.Join(_rep.Context.GiaoVien, a => a.MaGv, c => c.MaGv, (a, c) => new {
                a.MaGvl,
                a.MaGv,
                a.MaLop,
                c.MaMh,
            }).Where(gv => gv.MaLop == req.MaLop && gv.MaMh == req.MaMh).FirstOrDefault();

            return gv;
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
