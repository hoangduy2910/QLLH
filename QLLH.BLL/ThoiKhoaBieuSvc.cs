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

        public object getThoiKhoaBieuTheoTietHocVaLopHoc(int MaTiet, int MaLop)
        {
            var listTKB = All.Join(_rep.Context.MonHoc, a => a.MaMh, b => b.MaMh, (a, b) => new { 
                a.MaNgay,
                a.MaTiet,
                a.MaGv,
                a.MaMh,
                a.MaLop,
                TenMh = b.TenMh
            }).Where(tkb => tkb.MaTiet == MaTiet && tkb.MaLop == MaLop).ToList();
            return listTKB;
        }

        public object getThoiKhoaBieuTheoGiaoVien(int MaGv)
        {
            var listTKB = All.Where(tkb => tkb.MaGv == MaGv).ToList();
            return listTKB;
        }
        public object getAllThoiKhoaBieu()
        {
            var listTKB = All;
            return listTKB;
        }
    }
}
