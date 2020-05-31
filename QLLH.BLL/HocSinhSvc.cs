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
    public class HocSinhSvc : GenericSvc<HocSinhRep, HocSinh>
    {
        public object getHocSinhById(int id)
        {
            var hs = All.FirstOrDefault(hs => hs.MaHs == id);
            return hs;
        }

        public object getHocSinhByName(int page, int size, string keyword)
        {
            var hs = All.Where(hs => hs.TenHs.Contains(keyword)).Join(_rep.Context.GiaoVien, a => a.MaGv, b => b.MaGv, (a, b) => new {
                a.MaHs,
                a.TenHs,
                a.MaGv,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                TenGv = b.TenGv
            }).Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaHs,
                a.TenHs,
                a.MaGv,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.TenGv,
                tenLop = c.TenLop
            });

            var offset = (page - 1) * size;
            var totalRecord = hs.Count();
            var totalPage = (totalRecord % size) == 0 ? (int)(totalRecord / size) : (int)((totalRecord / size) + 1);
            var data = hs.Skip(offset).Take(size).ToList();

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

        public object getAllHocSinh(int page, int size, string keyword)
        {
            var hs = All.Join(_rep.Context.GiaoVien, a => a.MaGv, b => b.MaGv, (a, b) => new { 
                a.MaHs,
                a.TenHs,
                a.MaGv,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                TenGv = b.TenGv
            }).Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaHs,
                a.TenHs,
                a.MaGv,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.TenGv,
                tenLop = c.TenLop
            });
  
            var offset = (page - 1) * size;
            var totalRecord = hs.Count();
            var totalPage = (totalRecord % size) == 0 ? (int)(totalRecord / size) : (int)((totalRecord / size) + 1);
            var data = hs.Skip(offset).Take(size).ToList();

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
    }
}
