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
    public class ThoiKhoaBieuSvc : GenericSvc<ThoiKhoaBieuRep, ThoiKhoaBieu>
    {
        public object getThoiKhoaBieuTheoLop(int MaLop)
        {
            var listTKB = All.Where(tkb => tkb.MaLop == MaLop).ToList();
            return listTKB;
        }

        public object getThoiKhoaBieuTheoGiaoVien(int MaGv)
        {
            var listTKB = All.Join(_rep.Context.Lop, a => a.MaLop, b => b.MaLop, (a, b) => new {
                a.MaTkb,
                a.MaNgay,
                a.MaTiet,
                a.MaMh,
                a.MaGv,
                a.MaLop,
                TenLop = b.TenLop
            }).Where(tkb => tkb.MaGv == MaGv).ToList();
            return listTKB;
        }

        public object getThoiKhoaBieuTheoTietHocVaLopHoc(int MaTiet, int MaLop)
        {
            var listTKB = All.Join(_rep.Context.MonHoc, a => a.MaMh, b => b.MaMh, (a, b) => new { 
                a.MaTkb,
                a.MaNgay,
                a.MaTiet,
                a.MaMh,
                a.MaGv,   
                a.MaLop,
                TenMh = b.TenMh
            }).Where(tkb => tkb.MaTiet == MaTiet && tkb.MaLop == MaLop).ToList();
            return listTKB;
        }

        public object getThoiKhoaBieuTheoTietNgayLop(TietNgayLopReq req)
        {
            var tKB = All.Where(
                tkb => tkb.MaTiet == req.MaTiet &&
                tkb.MaNgay == req.MaNgay &&
                tkb.MaLop == req.MaLop
            ).FirstOrDefault();
            return tKB;
        }

        public object getThoiKhoaBieuTheoGiaoVienLop(GiaoVienLopReq req)
        {
            var tKB = All.Where(tkb => tkb.MaLop == req.MaLop && tkb.MaGv == req.MaGv).ToList();
            return tKB;
        }

        public object getAllThoiKhoaBieu()
        {
            var listTKB = All;
            return listTKB;
        }

        public SingleRsp updateThoiKhoaBieu(ThoiKhoaBieuReq tkb)
        {
            var res = new SingleRsp();
            ThoiKhoaBieu newTKB = new ThoiKhoaBieu();
            newTKB.MaTkb = tkb.MaTkb;
            newTKB.MaNgay = tkb.MaNgay;
            newTKB.MaTiet = tkb.MaTiet;
            newTKB.MaMh = tkb.MaMh;
            newTKB.MaGv = tkb.MaGv;
            newTKB.MaLop = tkb.MaLop;

            res = _rep.UpdateThoiKhoaBieu(newTKB);
            return res;
        }
    }
}
