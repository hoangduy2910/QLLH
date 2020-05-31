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

    public class GiaoVienSvc : GenericSvc<GiaoVienRep, GiaoVien>
    {
        public override SingleRsp Read(int id)
        {
            var res = new SingleRsp();
            var m = _rep.Read(id);
            res.Data = m;
            return res;
        }

        public object getGiaoVienById(int id)
        {
            var gv = All.FirstOrDefault(gv => gv.MaGv == id);
            var mh = _rep.Context.MonHoc.FirstOrDefault(mh => mh.MaMh == gv.MaMh);
            var newGV = new {
                gv.MaGv,
                gv.TenGv,
                mh.TenMh,
                gv.NgaySinh,
                gv.GioiTinh,
                gv.DiaChi,
                gv.SoDt
            };
            return newGV;
        }

        public object getGiaoVienByName(int page, int size, string keyword)
        {
            var gv = All.Where(gv => gv.TenGv.Contains(keyword)).Join(_rep.Context.MonHoc, a => a.MaMh, b => b.MaMh, (a, b) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                TenMh = b.TenMh
            });
            var totalRecord = gv.Count();
            var offset = (page - 1) * size;
            var totalPage = (totalRecord % size) == 0 ? (int)(totalRecord / size) : (int)((totalRecord / size) + 1); ;
            var data = gv.OrderBy(gv => gv.TenGv).Skip(offset).Take(size).ToList();
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

        public object getAllGiaoVien(int page, int size, string keyword)
        {
            var gv = All.Join(_rep.Context.MonHoc, a => a.MaMh, b => b.MaMh, (a, b) => new { 
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                TenMh = b.TenMh
            }).ToList();
            var offset = (page - 1) * size;
            var totalRecord = gv.Count();
            var totalPage = (totalRecord % size) == 0 ? (int)(totalRecord / size) : (int)((totalRecord / size) + 1);
            var data = gv.Skip(offset).Take(size).ToList();

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

        public object getAllGiaoVienNoDetail()
        {
            var gv = All;
            return gv;
        }

        public SingleRsp createGiaoVien(GiaoVienReq gv)
        {
            var res = new SingleRsp();
            GiaoVien newGV = new GiaoVien();
            newGV.MaGv = gv.MaGv;
            newGV.TenGv = gv.TenGv;
            newGV.MaMh = gv.MaMh;
            newGV.NgaySinh = gv.NgaySinh;
            newGV.GioiTinh = gv.GioiTinh;
            newGV.DiaChi = gv.DiaChi;
            newGV.SoDt = gv.SoDt;

            res = _rep.CreateGiaoVien(newGV);
            res.Data = newGV;
            return res;
        }

        public SingleRsp updateGiaoVien(GiaoVienReq gv)
        {
            var res = new SingleRsp();
            GiaoVien newGV = new GiaoVien();
            newGV.MaGv = gv.MaGv;
            newGV.TenGv = gv.TenGv;
            newGV.MaMh = gv.MaMh;
            newGV.NgaySinh = gv.NgaySinh;
            newGV.GioiTinh = gv.GioiTinh;
            newGV.DiaChi = gv.DiaChi;
            newGV.SoDt = gv.SoDt;
            res = _rep.UpdateGiaoVien(newGV);
            return res;
        }

        public SingleRsp removeGiaoVien(int id)
        {
            var res = new SingleRsp();
            var gv = All.FirstOrDefault(gv => gv.MaGv == id);
            res = _rep.RemoveGiaoVien(gv);
            return res;
        }
    }
}
