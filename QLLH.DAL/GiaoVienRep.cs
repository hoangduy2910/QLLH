using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using System.Linq;

namespace QLLH.DAL
{
    using Models;
    using QLLH.Common.Rsp;

    public class GiaoVienRep : GenericRep<QuanLyLopHocContext, GiaoVien>
    {
        public override GiaoVien Read(int id)
        {
            // return base.Read(id);
            var res = All.FirstOrDefault(x => x.MaGv == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = All.First(x => x.MaGv == id);
            m = Delete(m);
            return m.MaGv;
        }

        public SingleRsp CreateGiaoVien(GiaoVien gv)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newGV = context.GiaoVien.Add(gv);
                        context.SaveChanges();
                        tran.Commit();
                    } 
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }

        public SingleRsp UpdateGiaoVien(GiaoVien gv)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newGV = context.GiaoVien.Update(gv);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }

        public SingleRsp RemoveGiaoVien(GiaoVien gv)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newGV = context.GiaoVien.Remove(gv);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }
    }
}
