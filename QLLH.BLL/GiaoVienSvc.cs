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
            var gv = All.Where(gv => gv.MaGv == id).Join(_rep.Context.MonHoc, a => a.MaMh, b => b.MaMh, (a, b) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                TenMh = b.TenMh
            }).Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                a.TenMh,
                TenLop = c.TenLop
            }).FirstOrDefault();
            return gv;
        }

        public object getGiaoVienByName(int page, int size, string keyword)
        {
            var listGV = All.Where(gv => gv.TenGv.Contains(keyword)).Join(_rep.Context.MonHoc, a => a.MaMh, b => b.MaMh, (a, b) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                TenMh = b.TenMh
            }).Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                a.TenMh,
                TenLop = c.TenLop
            }).ToList();

            var totalRecord = listGV.Count();
            var offset = (page - 1) * size;
            var totalPage = (totalRecord % size) == 0 ? (int)(totalRecord / size) : (int)((totalRecord / size) + 1); ;
            var data = listGV.OrderBy(gv => gv.TenGv).Skip(offset).Take(size).ToList();
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

        public object getGiaoVienByLop(int page, int size, string keyword)
        {
            var listGV = All.Join(_rep.Context.GiaoVienLop, a => a.MaGv, b => b.MaGv, (a, b) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
            }).Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                TenLop = c.TenLop
            }).Where(gv => gv.TenLop == keyword);

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

        public object getGiaoVienByMonHoc(int page, int size, string keyword)
        {
            var listGV = All.Join(_rep.Context.MonHoc, a => a.MaMh, b => b.MaMh, (a, b) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                TenMh = b.TenMh
            }).Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                a.TenMh,
                TenLop = c.TenLop
            }).Where(gv => gv.TenMh == keyword);

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

        public object getGiaoVienByMonHocID(int MaMh)
        {
            var listGV = All.Join(_rep.Context.MonHoc, a => a.MaMh, b => b.MaMh, (a, b) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                TenMh = b.TenMh
            }).Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                a.TenMh,
                TenLop = c.TenLop
            }).Where(gv => gv.MaMh == MaMh);

            return listGV;
        }
        public object getGiaoVienChuNhiemByLop(int MaLop)
        {
            var gv = All.Where(gv => gv.MaLop == MaLop).FirstOrDefault();
            return gv;
        }

        public object getAllGiaoVien(int page, int size, string keyword)
        {
            var listGV = All.Join(_rep.Context.MonHoc, a => a.MaMh, b => b.MaMh, (a, b) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                TenMh = b.TenMh
            }).Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                a.TenMh,
                TenLop = c.TenLop
            }).ToList();

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

        public object getAllGiaoVienNoDetail()
        {
            var listGV = All.Join(_rep.Context.Lop, a => a.MaLop, c => c.MaLop, (a, c) => new {
                a.MaGv,
                a.TenGv,
                a.MaMh,
                a.MaLop,
                a.NgaySinh,
                a.GioiTinh,
                a.DiaChi,
                a.SoDt,
                TenLop = c.TenLop
            }).ToList();

            return listGV;
        }

        public SingleRsp createGiaoVien(GiaoVienReq gv)
        {
            var res = new SingleRsp();
            GiaoVien newGV = new GiaoVien();
            newGV.MaGv = gv.MaGv;
            newGV.TenGv = gv.TenGv;
            newGV.MaMh = gv.MaMh;
            newGV.MaLop = gv.MaLop;
            newGV.NgaySinh = gv.NgaySinh;
            newGV.GioiTinh = gv.GioiTinh;
            newGV.DiaChi = gv.DiaChi;
            newGV.SoDt = gv.SoDt;

            res = _rep.CreateGiaoVien(newGV);
            //res.Data = newGV;
            return res;
        }

        public SingleRsp updateGiaoVien(GiaoVienReq gv)
        {
            var res = new SingleRsp();
            GiaoVien newGV = new GiaoVien();
            newGV.MaGv = gv.MaGv;
            newGV.TenGv = gv.TenGv;
            newGV.MaMh = gv.MaMh;
            newGV.MaLop = gv.MaLop;
            newGV.NgaySinh = gv.NgaySinh;
            newGV.GioiTinh = gv.GioiTinh;
            newGV.DiaChi = gv.DiaChi;
            newGV.SoDt = gv.SoDt;

            res = _rep.UpdateGiaoVien(newGV);
            //res.Data = newGV;
            return res;
        }

        public SingleRsp removeGiaoVien(int id)
        {
            var res = new SingleRsp();
            var gv = All.FirstOrDefault(gv => gv.MaGv == id);
            res = _rep.RemoveGiaoVien(gv);
            return res;
        }

        public object updateGiaoVienChuNhiem(int MaGVOld, int MaGvNew, int MaLop)
        {
            var gvOld = All.Where(gv => gv.MaGv == MaGVOld).FirstOrDefault();
            gvOld.MaLop = 1;
            _rep.UpdateGiaoVien(gvOld);

            var gvNew = All.Where(gv => gv.MaGv == MaGvNew).FirstOrDefault();
            gvNew.MaLop = MaLop;
            _rep.UpdateGiaoVien(gvNew);

            var res = new
            {
                gvOld = gvOld, 
                gvNew = gvNew 
            };
            return res;
        }
    }
}
